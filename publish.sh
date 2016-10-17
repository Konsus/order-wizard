#!/bin/bash
# save branch
branch="$(git symbolic-ref --short -q HEAD)"
# checkout to master branch
git checkout master
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
