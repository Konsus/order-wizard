#!/bin/bash
branch=$(git symbolic-ref --short -q HEAD)
git stash
git checkout -B release
git merge origin/master
npm run lib
git add --force ./lib
git commit -m '[auto-release]'
echo "switch back to $branch"
git checkout $branch
git stash pop