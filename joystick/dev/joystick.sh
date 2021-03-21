#!/bin/bash

# Adapted from:
# Copyright 2013 Jeroen Janssens
# All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

# Run a simple server: websocketd --devconsole --port 8080 ./joystick.sh

# PROCESS 1: send last line to all users
# -f: output appended as file grows
# --pid: terminate after PID dies. $$ is last command bash starts
# --line-buffered:   writing output each time it saw a newline,
#                    instead of waiting to reach 4096 bytes by default
# -v: output lines where user does not appear
# entire tail background process writing to stdout for all connections
tail -n 0 -f joystick.log --pid=$$ | grep -v "X" --line-buffered &

# PROCESS 2: read MSG from stdin, which is from remote websocket
# Write the message to the log. Each connection gets its own input.
# All inputs written to same output.
# {"action":"set", "target":"id", "value":"val"}
while read MSG; do echo "${MSG}" >> joystick.log; done

# https://www.kernel.org/doc/html/latest/input/joydev/joystick-api.html
