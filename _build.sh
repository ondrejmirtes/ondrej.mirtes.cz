#!/bin/sh

export LANG=en_US.UTF-8
export LC_ALL="en_US.UTF-8"

git fetch origin
git reset --hard $1
jekyll build
