#!/opt/homebrew/bin/bash

# File to hold the data arrays
data_file="/tmp/graph_data.sh"

# Initialize data arrays
echo "declare -a data1=()" > "$data_file"
echo "declare -a data2=()" >> "$data_file"
echo "declare -a data3=()" >> "$data_file"
echo "declare -a data4=()" >> "$data_file"

# Function to simulate data input
update_data() {
    local -n data_ref=$1
    local new_value=$2
    data_ref+=("$new_value")
}

# Main loop to update data
while true; do
    # Simulate data updates
    source "$data_file"
    update_data data1 $(( RANDOM % 10 + 1 ))
    update_data data2 $(( RANDOM % 10 + 1 ))
    update_data data3 $(( RANDOM % 10 + 1 ))
    update_data data4 $(( RANDOM % 10 + 1 ))

    # Save updated data to file
    echo "data1=(${data1[*]})" > "$data_file"
    echo "data2=(${data2[*]})" >> "$data_file"
    echo "data3=(${data3[*]})" >> "$data_file"
    echo "data4=(${data4[*]})" >> "$data_file"

    # Wait for a bit before updating again
    sleep 0.5
done
