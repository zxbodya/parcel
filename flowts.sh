#!/usr/bin/env bash

flowts \
  --interactive-rename \
  -x core/integration-tests/test/integration/** \
  ./packages/

