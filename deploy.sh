#!/bin/bash

set -o errexit # Exit on error


if $(git commit -am Deploy); then # Commit the changes, if any
  echo 'deploy'
fi

