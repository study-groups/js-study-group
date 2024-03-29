#!/bin/bash

# file: picomq.sh
# A message queue relying on Linux process control (Kafka-esque)
# and relying on fifos with processing loops (Spark-like)

pico_mq_create(){
  mkdir picoGen
  mkdir picoMeasure
  mkdir picoTerm
}

pico_mq_destroy(){
  rm -r picoGen
  rm -r picoMeasure
  rm -r picoTerm
}

# Function to build a Pico Object
build_pico_object() {
    local id="$1"
    local pid="$2"
    local domid="$3"
    local type="$4"
    local msg="$5"
    local data="$6"

    echo -e "$id\n$pid\n$domid\n$type\n$msg\n$data"
}

# Function to read and parse a Pico Object
read_pico_object() {
    local fifo=$1
    read -r id < "$fifo"
    read -r pid < "$fifo"
    read -r domid < "$fifo"
    read -r type < "$fifo"
    read -r msg < "$fifo"
    read -r data < "$fifo"
}

# Process for measuring data
picoMeasure() {
    while [ "$(cat picoMeasure/onflag)" = "on" ]; do
        if read -r line < picoMeasure/in; then
            read_pico_object picoMeasure/in
            sum=$(echo "$data" | \
                 awk -F, '{ for (i=1; i<=NF; i++) sum+=$i } END { print sum }')
            newObj=$(build_pico_object 
             "$(date +%s%3N)"
             "$BASHPID"
             "$domid" 
             "pt-measure"
             "$msg"
             "$sum")
            echo -e "$newObj" > picoMeasure/out
        fi
    done
}

# Terminal process
picoTerm() {
    trap "echo 'Terminating picoTerm'; exit" SIGINT SIGTERM
    exec 3< picoTerm/in
    while true; do
        if read -t 0.1 -u 3 line; then
            [[ "$line" == "q" ]] && break
            echo "$line"
        fi
    done
    exec 3<&-
}

# Data generation process
picoGen() {
    newObj=$(build_pico_object \
        "$(date +%s%3N)" \
         "$BASHPID" \
         "domid" \
         "pt-generate" \
         "msg" \
         "$@")

    echo -e "$newObj"
}

picoGenContinuous() {
    local sleep_delay="$1"; shift
    while [ "$(cat picoGen/onflag)" = "on" ]; do
        picoGen "$@" > picoGen/out
        sleep "$sleep_delay"
    done
}

# Forward packets from Gen to Term
picoRun() {
    while read -r line < picoGen/out; do
        echo "$line" > picoTerm/in
    done
}

# Cleanup function to stop all subprocesses
picoCleanupSigInt() {
    echo "Stopping all subprocesses..."
    kill -- -$$  # Send SIGTERM to the process group
}

# Main setup and run function
picoSetupAndRun() {
    # Trap SIGINT to run cleanup function
    trap picoCleanupSigInt SIGINT
    picoInit
    echo "on" > picoGen/onflag
    (continuousPicoGen .1 & picoRun) &
    picoTerm
    wait
    echo "Main process exiting."
}
