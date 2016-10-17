#!/bin/bash
# save branch
git stash save "auto-release-stash"
branch="$(git symbolic-ref --short -q HEAD)"
# checkout to master branch
git checkout -B master origin/master
git merge develop
# compile
compile="$(npm run lib >/dev/null)"
if [ -n "$compile" ]; then
    echo "Compilation has errors!"
else
    # publish
    echo "Publish!"
    git add --force ./lib
    git commit -m '[auto-release]'
fi
# switch back
git checkout -- ./lib
echo "switch back to $branch"
git checkout ${branch}
git stash pop
