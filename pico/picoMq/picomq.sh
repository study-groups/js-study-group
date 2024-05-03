#!/bin/bash
# Enabling debugging
set -x

# Setting default type if not already set
type=${TYPE:-TXT}

# Ensure PMQ_PID is not empty or unset
if [[ ! -z "$PMQ_PID" ]]; then
  kill "$PMQ_PID" >/dev/null 2>&1
fi

# Create FIFOs if not existing
rm -f in out
mkfifo in out

# Write to input FIFO
w(){ echo "$@" > in; }

# Read from input FIFO
r(){ while IFS= read -r line; do echo "$line"; done < in; }

# Append timestamp and type
u(){ echo "$(gdate +%s%6N) $type $@"; }

# Process and write to output FIFO
t(){ while IFS= read -r line; do u "$line"; done > out; }

# Run processing in background and save PID
while true; do r | t; done & PMQ_PID=$!

# Use 'wait' to wait for the background process to finish, if needed.
trap "kill $PMQ_PID; exit" SIGINT SIGTERM
wait $PMQ_PID
