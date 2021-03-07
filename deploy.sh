#!/usr/bin/env sh

# ȷ���ű��׳������Ĵ���
set -e

npm run docs:build

cd ./dist

git init
git add -A
git commit -m 'deploy'

# npm run docs:build && cd ./dist && git init && git add -A && git commit -m 'deploy'
git push -f git@github.com:relieved-hai/notebook.git master:gh-pages

# cd -
