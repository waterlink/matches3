#!/usr/bin/env bash

while :; do
    npm test || (git reset --hard && git clean -df)
    sleep 2
done