#!/bin/bash
#while true; do
#while read line
#do
#  sleep .75
#  echo $line
#done <./color.json
#done

#!/bin/bash
while true; do
  while read line; do
    echo $line
    sleep 0.75
  done <./color.json
done

