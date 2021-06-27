#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

npm run docs:build

cd /Users/mr_pang/Desktop/other/github/note && cd ./dist && rm -rf writing/

git init && git add -A && git commit -m 'deploy docs'

git push -f git@github.com:relieved-hai/notebook.git master:gh-pages

cd -
