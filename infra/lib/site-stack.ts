import * as path from 'path';
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

const DOMAIN = 'ondrej.mirtes.cz';
const ZONE_NAME = 'mirtes.cz';
const ZONE_ID = 'Z3DG4DJKE958FW';

export class SiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Zone', {
      hostedZoneId: ZONE_ID,
      zoneName: ZONE_NAME,
    });

    // DNS-validated certificate for the apex subdomain (us-east-1, for CloudFront).
    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: DOMAIN,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    // Private bucket — only CloudFront reads it via Origin Access Control.
    // (The old setup used a public-read bucket; OAC is the modern, locked-down
    // equivalent.)
    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Pretty-URL rewriting. Replaces the `web-ondrej-mirtes-cz-rewrite-url`
    // Lambda@Edge with a (cheaper, lower-latency) CloudFront Function, and
    // fixes /en/rss (and any /en/rss-*) which the old code missed.
    const rewriteFunction = new cloudfront.Function(this, 'RewriteFunction', {
      comment: 'Rewrite pretty URLs to S3 object keys',
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromFile({
        filePath: path.join(__dirname, '..', 'cloudfront', 'rewrite.js'),
      }),
    });

    // Security headers. Replaces the `web-ondrej-mirtes-cz-response`
    // Lambda@Edge with a native managed response-headers policy (same headers).
    const responseHeaders = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
      securityHeadersBehavior: {
        strictTransportSecurity: {
          accessControlMaxAge: Duration.days(365),
          includeSubdomains: true,
          preload: true,
          override: true,
        },
        contentTypeOptions: { override: true },
        frameOptions: {
          frameOption: cloudfront.HeadersFrameOption.SAMEORIGIN,
          override: true,
        },
        referrerPolicy: {
          referrerPolicy: cloudfront.HeadersReferrerPolicy.SAME_ORIGIN,
          override: true,
        },
        xssProtection: { protection: true, modeBlock: true, override: true },
      },
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      domainNames: [DOMAIN],
      certificate,
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        functionAssociations: [
          {
            function: rewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
        responseHeadersPolicy: responseHeaders,
      },
      errorResponses: [
        // With a private (OAC) bucket, S3 returns 403 for a missing key (no
        // s3:ListBucket), so map both 403 and 404 to the (English) 404 page.
        {
          httpStatus: 403,
          responsePagePath: '/en/404.html',
          responseHttpStatus: 404,
          ttl: Duration.seconds(300),
        },
        {
          httpStatus: 404,
          responsePagePath: '/en/404.html',
          responseHttpStatus: 404,
          ttl: Duration.seconds(300),
        },
      ],
    });

    // NOTE: site content is deployed separately (see ../deploy-content.sh),
    // so infrastructure changes and content updates stay independent.

    // ondrej.mirtes.cz -> the distribution (A + AAAA aliases).
    // NOTE: an existing CNAME for this name must be removed first (see README).
    const recordTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(distribution),
    );
    new route53.ARecord(this, 'AliasA', {
      zone,
      recordName: DOMAIN,
      target: recordTarget,
    });
    new route53.AaaaRecord(this, 'AliasAAAA', {
      zone,
      recordName: DOMAIN,
      target: recordTarget,
    });

    // ---- Redirect-only domains: mirtes.cz + www.mirtes.cz -> ondrej.mirtes.cz
    // A CloudFront Function returns a 301 at the edge, so the origin below is
    // never contacted (it's only there to satisfy the distribution config).
    const redirectCertificate = new acm.Certificate(this, 'RedirectCertificate', {
      domainName: ZONE_NAME,
      subjectAlternativeNames: [`www.${ZONE_NAME}`],
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const redirectFunction = new cloudfront.Function(this, 'RedirectFunction', {
      comment: `Redirect ${ZONE_NAME} / www.${ZONE_NAME} to ${DOMAIN}`,
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromFile({
        filePath: path.join(__dirname, '..', 'cloudfront', 'redirect.js'),
      }),
    });

    const redirectDistribution = new cloudfront.Distribution(this, 'RedirectDistribution', {
      domainNames: [ZONE_NAME, `www.${ZONE_NAME}`],
      certificate: redirectCertificate,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        // Placeholder origin — never reached; the function 301s every request.
        origin: new origins.HttpOrigin(DOMAIN),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: redirectFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
    });

    const redirectRecordTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(redirectDistribution),
    );
    // Apex (mirtes.cz) — leaves MX/NS/SOA/TXT untouched, only A/AAAA.
    new route53.ARecord(this, 'ApexA', {
      zone,
      target: redirectRecordTarget,
      deleteExisting: true,
    });
    new route53.AaaaRecord(this, 'ApexAAAA', {
      zone,
      target: redirectRecordTarget,
      deleteExisting: true,
    });
    // www (an existing CNAME must be removed first — see README).
    new route53.ARecord(this, 'WwwA', {
      zone,
      recordName: `www.${ZONE_NAME}`,
      target: redirectRecordTarget,
    });
    new route53.AaaaRecord(this, 'WwwAAAA', {
      zone,
      recordName: `www.${ZONE_NAME}`,
      target: redirectRecordTarget,
    });

    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
    new CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new CfnOutput(this, 'DistributionDomain', { value: distribution.distributionDomainName });
    new CfnOutput(this, 'RedirectDistributionId', { value: redirectDistribution.distributionId });
    new CfnOutput(this, 'SiteUrl', { value: `https://${DOMAIN}/` });
  }
}
