#!/bin/bash
# save branch
git stash save "version-patch"
branch="$(git symbolic-ref --short -q HEAD)"
# checkout to master branch
git checkout -B master origin/master
git merge develop --no-edit
# create version
npm version patch
# switch back
git checkout -- ./lib
echo "switch back to $branch"
git checkout ${branch}
git stash pop
