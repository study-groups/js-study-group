#!/bin/bash

# Copyright 2013 Jeroen Janssens
# All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

# Run a simple chat server: websocketd --devconsole --port 8080 ./chat.sh
echo "Please enter your name:"; read USER
echo "[$(date)] ${USER} joined the chat" >> chat.log
echo "[$(date)] Welcome to the chat ${USER}!"

# PROCESS 1: send last line to all users
# -f: output appended as file grows
# --pid: terminate after PID dies. $$ is last command bash starts
# --line-buffered:   writing output each time it saw a newline,
#                    instead of waiting to reach 4096 bytes by default
# -v: output lines where user does not appear
# entire tail background process writing to stdout for all connections
tail -n 0 -f chat.log --pid=$$ | grep --line-buffered -v "] ${USER}>" &

# PROCESS 2: read MSG from stdin, which is from remote websocket
# Write the message to the log. Each connection gets its own input.
# All inputs written to same output, e.g. chat.log
while read MSG; do echo "[$(date)] ${USER}> ${MSG}" >> chat.log; done
