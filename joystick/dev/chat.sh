#!/bin/bash
while read -r line
do
  echo "From server: $line"
done </dev/stdin
