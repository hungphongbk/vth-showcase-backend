#!/bin/bash

original_dir=`pwd`
cd "$(dirname "$0")/../"

gh secret set SERVER_ENV --env=preview < .env.staging
gh secret set SERVER_ENV --env=production < .env.production

cd $original_dir