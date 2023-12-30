#!/bin/bash
#while IFS= read -r input 
while read  input 
do 
  printf "You said: %s\\n" "${input}"; 
done


#while read line 
#do
#  echo $line 
#done < /dev/stdin
