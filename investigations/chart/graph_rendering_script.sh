#!/opt/homebrew/bin/bash

# File where data arrays are stored
data_file="/tmp/graph_data.sh"

# Function to render the graph from data arrays
render_graph() {
    source "$data_file"
    clear
    echo "Real-Time Composite Stock Trends Graph:"
    
    local max_height=16
    local width=${#data1[@]}  # Assuming all arrays are the same length for simplicity
    local symbol='-'
    
    # Create an empty graph
    declare -A graph
    for ((i=0; i<max_height; i++)); do
        for ((j=0; j<width; j++)); do
            graph[$i,$j]=" "
        done
    done
    
    # Plot the data
    for idx in "${!data1[@]}"; do
        local scaled_value=$(( ${data1[idx]} * max_height / 10 ))
        graph[$((max_height - scaled_value - 1)),$idx]="$symbol"
    done

    # Print the graph
    for ((i=0; i<max_height; i++)); do
        for ((j=0; j<width; j++)); do
            echo -n "${graph[$i,$j]}"
        done
        echo ""
    done
}

# Continuously render the graph
while true; do
    render_graph
    sleep 1  # Update the graph every second
done
