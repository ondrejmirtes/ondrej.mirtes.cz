#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site-stack';
import { GithubDeployStack } from '../lib/github-deploy-stack';

const app = new cdk.App();

// CloudFront ACM certificates must live in us-east-1, so the whole stack
// (cert + function + distribution + bucket) is deployed there.
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT ?? '928192134594',
  region: 'us-east-1',
};

const site = new SiteStack(app, 'OndrejMirtesCzSite', {
  env,
  description: 'Static hosting for ondrej.mirtes.cz (S3 + CloudFront)',
});

new GithubDeployStack(app, 'OndrejMirtesCzGithubDeploy', {
  env,
  site,
  description: 'OIDC roles for GitHub Actions deploys of ondrej.mirtes.cz',
});
