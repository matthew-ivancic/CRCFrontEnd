Cloud Resume Challenge Front End


This repo contains the files that are uploaded to the S3 bucket which the final website is keyed off of. Github action uploads them to the correct bucket, then invalidates the Cloudfront cache (necessary for file changes to display on the end product)
