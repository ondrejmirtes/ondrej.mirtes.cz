#!/usr/bin/env bash
# Deploy site CONTENT (not infrastructure).
# Builds the site, syncs it to the S3 bucket, and invalidates CloudFront.
# Infrastructure is managed separately in infra/ (see infra/README.md).
set -euo pipefail

STACK="OndrejMirtesCzSite"
REGION="us-east-1"
cd "$(dirname "$0")"

echo "==> Building site"
npm run build

echo "==> Reading stack outputs ($STACK)"
BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" --output text)
DIST=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text)
echo "    bucket=$BUCKET dist=$DIST"

echo "==> Syncing _site/ -> s3://$BUCKET/ (with --delete)"
aws s3 sync _site/ "s3://$BUCKET/" --delete

# The .rss extension isn't in the mime database, so the feeds upload as
# binary/octet-stream. Force the correct content type on them.
echo "==> Fixing RSS feed content-type"
aws s3 cp "s3://$BUCKET/" "s3://$BUCKET/" --recursive \
  --exclude '*' --include '*.rss' \
  --metadata-directive REPLACE \
  --content-type 'application/rss+xml; charset=utf-8'

echo "==> Invalidating CloudFront ($DIST)"
aws cloudfront create-invalidation --distribution-id "$DIST" --paths '/*' \
  --query 'Invalidation.Status' --output text

echo "==> Done."
