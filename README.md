Cloud Resume Challenge Front End

This repo contains the files that are uploaded to the S3 bucket which the final website is keyed off of. Github action uploads them to the correct bucket

Cloudfront cache needs to be manually cleared (aws cloudfront create-invalidation --distribution-id {{ secrets.CLOUDFRONT_DISTRIBUTION }} --paths "/*") unless I can figure out permissions. (Github Actions role cannot access Cloudfront  - able to be manually invalidated via the account that created the distribution)
