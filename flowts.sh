#!/usr/bin/env bash

set -e

flowts \
  --commit-rename-command "git add . && git commit --no-verify -m 'flowts rename'" \
  -x core/integration-tests/test/integration/** \
  ./packages/

git add .
git commit --no-verify -m 'flowts convert'

