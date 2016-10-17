#!/bin/bash
# save branch
branch="$(git symbolic-ref --short -q HEAD)"
# checkout to release branch
git checkout release
git merge origin/master
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
