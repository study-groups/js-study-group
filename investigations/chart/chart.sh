#!/opt/homebrew/bin/bash

# Define a function to print a composite graph with dynamic data input
print_composite_graph() {
    local datasets=("$@")  # Capture all arguments as an array
    local max_height=16
    local total_days=60
    local width=80
    local padding=$(( (width - total_days) / 2 ))

    # Define symbols and colors for data lines
    local symbols=(',', '.', "'", '-')
    local colors=('31', '32', '33', '34')  # ANSI color codes: Red, Green, Yellow, Blue

    # Prepare an empty graph area
    declare -A graph
    for ((i=0; i<max_height; i++)); do
        for ((j=0; j<width; j++)); do
            graph[$i,$j]=" "
        done
    done

    # Function to plot a dataset
    plot_dataset() {
        local -n data_ref=$1
        local symbol=$2
        local color_code=$3
        for ((day=0; day<${#data_ref[@]}; day++)); do
            local value="${data_ref[$day]}"
            local scaled_value=$(echo "scale=0; $value * ($max_height - 1) / 2" | bc)
            if (( scaled_value < max_height )); then
                graph[$scaled_value,$((day + padding))]=$(echo -e "\033[${color_code}m${symbol}\033[0m")
            fi
        done
    }

    # Iterate over each dataset provided
    for ((d=0; d<${#datasets[@]}; d++)); do
        local dataset="${datasets[$d]}"
        if [ -n "${dataset}" ]; then
            plot_dataset "${dataset}" "${symbols[$d]}" "${colors[$d]}"
        fi
    done

    # Print the graph
    echo "Composite Stock Trends Graph:"
    for ((i=max_height-1; i>=0; i--)); do
        for ((j=0; j<width; j++)); do
            echo -n "${graph[$i,$j]}"
        done
        echo ""
    done
}

# Example setup for data arrays
declare -a data1=( $(seq 1.0 0.01666667 2.0) )
declare -a data2=( $(seq 2.0 -0.01666667 1.0) )
declare -a data3=( $(seq 1.0 0.025 2.5) )
declare -a data4=( $(seq 2.5 -0.025 1.0) )

# Display composite graph by calling with dynamic arguments
echo "Composite Stock Trends Graph:"
print_composite_graph "data1" "data2" "data3" "data4"
