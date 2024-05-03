#!/bin/bash

# Path to the FIFO
fifo_path="out"
keep_running=true

cleanup() {
    echo "Cleaning up..."
    exec 3<&-
    echo "Done."
    keep_running=false
    # Use `return` instead of `exit` to prevent closing the shell when sourced
    return 0
}

monitor_fifo() {
    # Set a trap to call cleanup on SIGINT
    trap cleanup SIGINT
    
    exec 3<> "$fifo_path"
    while $keep_running; do
        if IFS= read -r line <&3; then
            echo "$line"
        else
            # If read fails, the writer to the FIFO has likely stopped.
            # You can handle this case as needed, such as breaking the loop.
            # For continuous monitoring, we'll keep the loop running.
            :
        fi
    done
    exec 3<&-
}

# Execute the monitoring function
monitor_fifo
