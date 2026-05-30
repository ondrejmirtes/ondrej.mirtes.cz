#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site-stack';

const app = new cdk.App();

new SiteStack(app, 'OndrejMirtesCzSite', {
  // CloudFront ACM certificates must live in us-east-1, so the whole stack
  // (cert + function + distribution + bucket) is deployed there.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT ?? '928192134594',
    region: 'us-east-1',
  },
  description: 'Static hosting for ondrej.mirtes.cz (S3 + CloudFront)',
});
