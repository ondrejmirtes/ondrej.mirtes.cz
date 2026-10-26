import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { SiteStack } from './site-stack';

// Only workflows running on this branch of this repository may assume the roles.
const GITHUB_SUBJECT = 'repo:ondrejmirtes/ondrej.mirtes.cz:ref:refs/heads/eleventy';

export interface GithubDeployStackProps extends StackProps {
  site: SiteStack;
}

// IAM roles that GitHub Actions assumes through OIDC (no long-lived AWS keys).
// The workflows in .github/workflows reference the roles by their fixed names.
export class GithubDeployStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubDeployStackProps) {
    super(scope, id, props);

    const provider = new iam.OidcProviderNative(this, 'GithubOidcProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });

    const principal = new iam.OpenIdConnectPrincipal(provider, {
      StringEquals: {
        'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        'token.actions.githubusercontent.com:sub': GITHUB_SUBJECT,
      },
    });

    // Infra: `cdk deploy` only needs to assume the CDK bootstrap roles, which
    // do the actual CloudFormation and asset work.
    const infraRole = new iam.Role(this, 'InfraDeployRole', {
      roleName: 'github-deploy-infra',
      assumedBy: principal,
      description: 'GitHub Actions: cdk deploy of infra/',
    });
    infraRole.addToPolicy(new iam.PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: [`arn:aws:iam::${this.account}:role/cdk-hnb659fds-*-role-${this.account}-${this.region}`],
    }));

    // Content: exactly what ../../deploy-content.sh does.
    const contentRole = new iam.Role(this, 'ContentDeployRole', {
      roleName: 'github-deploy-content',
      assumedBy: principal,
      description: 'GitHub Actions: sync built site to S3 and invalidate CloudFront',
    });
    contentRole.addToPolicy(new iam.PolicyStatement({
      actions: ['cloudformation:DescribeStacks'],
      resources: [`arn:aws:cloudformation:${this.region}:${this.account}:stack/${props.site.stackName}/*`],
    }));
    props.site.bucket.grantReadWrite(contentRole);
    props.site.distribution.grantCreateInvalidation(contentRole);
  }
}
