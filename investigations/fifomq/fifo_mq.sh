#!/bin/bash
function date() {
    /opt/homebrew/bin/gdate "$@"
}


# file: fiff_mq.sh
# A message queue relying on Linux process control (Kafka-esque)
# and relying on fifos with processing loops (Spark-like)

fifo_mq_help(){
cat << EOF
1. Run the script containing the fifo_mq_help function.
2. Call the fifo_mq_create function to create the FIFOs
   and initialize control flags.
3. Call the fifo_mq_ru function to start all subprocesses
   in a subshell.
4. Call the fifo_mq_geerate function to generate a single
   experiment outcome.
5. Call the fifo_mq_geerateExperiments function to run 
   multiple experiments with specified parameters.
6. Use the fifo_mq_destroy function to clean up and remove
   the FIFOs and other files created during the process.
7. You can also call other specific functions like
   fifo_mq_compute, fifo_mq_out, fifo_mq_get,
   fifo_mq_compute2, and fifo_mq_out2 as needed.
EOF
}

fifo_mq_tty() {
  current_tty=$(tty | cut -d/ -f3)
  echo $current_tty
}

fifo_mq_ps() {
  ps | grep  $current_tty
}

fifo_mq_create(){
  mkfifo ./in_fifo         # input capture
  mkfifo ./compute_fifo    # compute control plane 
  mkfifo ./out_fifo        # output
  touch ./sleep
  touch ./fps
  MQ_ID=$(date +%s%3N)        # One message queue per Bash env
}

fifo_mq_destroy(){
  rm ./in_fifo
  rm ./compute_fifo
  rm ./out_fifo 
  rm ./sleep
  rm ./fps
  rm ./log
  rm ./pid
}

fifo_mq_init() {
    # Initialize FIFO and control flags
    MQ_SLEEP=1000      # fifo_mq_generator
    MQ_FPS=24         # pull and display rate from fifo_out 
    echo $MQ_SLEEP > ./sleep
    echo $MQ_FPS > ./fps
}
fifo_mq_compute() {
    local sum=0
    local count=1  # Prevent divide by zero
    local startTime=$(date +%s%3N)
    local sleep_interval=$(< "./sleep")  # Initial read of sleep interval

    # Start fswatch to monitor changes to the sleep file
    fswatch -o "./sleep" | while read -r event_count; do
        # Update the sleep interval upon detection of changes
        sleep_interval=$(< "./sleep")
    done &
    local fswatch_pid=$!

    while true; do
        # Read line from input FIFO
        if read -r line < ./in_fifo; then
            IFS=' ' read -r timestamp type value <<< "$line"
            if [[ "$type" == *random* ]]; then
                sum=$((sum + value))
                count=$((count + 1))
            fi
        fi

        # Calculate elapsed time
        local currentTime=$(date +%s%3N)
        local elapsedTime=$((currentTime - startTime))

        # Log and output average every 5 seconds
        if ((elapsedTime % 5000 == 0)); then
            local average=$((sum / count))
            echo "$(date +%s%3N) stats average $average" >> ./log
            echo "$(date +%s%3N) stats average $average" > ./out_fifo
        fi

        # Convert sleep_interval from milliseconds to seconds for sleep command
        local sleep_time=$(echo "scale=3; $sleep_interval/1000" | bc)
        sleep $sleep_time
    done

    # Kill fswatch process upon exit
    kill $fswatch_pid
}

fifo_mq_compute_delete() {
    local sum=0
    local count=1 # prevent divide by zero
    local startTime=$(date +%s%3N)

    while true; do
        sleep_interval=$(< "./sleep")

        # Break condition based on sleep interval
        [ "$sleep_interval" = "0" ] && break

        if read -r line < ./in_fifo; then
            IFS=' ' read -r timestamp type value <<< "$line"

            if [[ "$type" == *random* ]]; then
                sum=$((sum + value))
                count=$((count + 1))
            fi
        fi
        currentTime=$(date +%s%3N)  # Current time in milliseconds
        elapsedTime=$((currentTime - startTime))  # Elapsed time in milliseconds

        # Check if elapsedTime is a multiple of 5000 milliseconds (5 seconds)
        if ((elapsedTime % 5000 == 0)); then
            average=$((sum / count))
            echo "$(date +%s%3N) stats average $average" >> ./log
        fi

        # Assuming sleep_interval is defined in milliseconds
        if ((elapsedTime % sleep_interval == 0)); then
            echo "$(date +%s%3N) stats average $average" > ./out_fifo
        fi

        # Convert sleep_interval from milliseconds to seconds for sleep command
        sleep_time=$(echo "scale=3; $sleep_interval/1000" | bc)
        sleep $sleep_time
    done

     sleep $sleep_interval 
    fifo_mq_compute
}


fifo_mq_gen() {
    while true; do
        # Read the interval which is expected to be in milliseconds
        current_delay_ms=$(< "./sleep")

        # Break the loop if the delay is zero
        [ "$current_delay_ms" = "0" ] && break

        # Generate a random integer and write to the input FIFO
        # with a timestamp
        echo $(date +%s%3N) random-int $RANDOM > ./in_fifo

        # Convert milliseconds to seconds for sleep command
        sleep_seconds=$(echo "scale=3; $current_delay_ms/1000" | bc)

        # Sleep for the calculated time in seconds
        sleep "$sleep_seconds"
    done
}



fifo_mq_out() {
    cat ./out_fifo
}


fifo_mq_gen2() {
    while true; do
        echo "fifo_mq_gen is running"
        sleep 1
    done
}

fifo_mq_compute2() {
    while true; do
        echo "fifo_mq_compute is running"
        sleep 1
    done
}

fifo_mq_out2() {
    while true; do
        echo "fifo_mq_out is running"
        sleep 1
    done
}
fifo_mq_run() {
    echo "Starting all subprocesses in a subshell"
    trap 'fifo_mq_sigint' SIGINT   # Async UNIX control signal 
    fifo_mq_init 

    # Start all subprocesses in the background within a subshell
    (
        fifo_mq_gen < /dev/null &
        fifo_mq_compute < /dev/null &
        fifo_mq_out < /dev/null &
    ) &

    parent_pid=$!  # Store PID of the parent process (subshell)
    echo "Subprocesses running in background with parent PID: $parent_pid"

    # Optional: wait for the parent process to finish if needed
    # wait $parent_pid
    # echo "Main process exiting."
}

fifo_mq_sigint() {
    echo "Stopping all subprocesses..."
    fifo_mq_kill_all
}

fifo_mq_kill_all(){
    kill -- -$parent_pid
    pgrep $(fifo_mq_tty)
    echo "All subprocesses stopped."
}


# Function to generate a single experiment outcome
_generateExperiment() {
    local max_len=$1
    local prob_true=$2
    local experiment_len=$(( RANDOM % max_len + 1 ))
    local result=""

    for (( i=0; i<experiment_len; i++ )); do
        if (( $(echo "$RANDOM < $prob_true * 32767" | bc) )); then
            result+="1"
        else
            result+="0"
        fi
    done

    echo "$result"
}

# Function to run N experiments
_runExperiments() {
    local M=${1:-64}            # Default max length M to 64
    local probTrue=${2:-0.7}    # Default probability_of_true to 0.7
    local N=${3:-1024}

    for (( n=0; n<N; n++ )); do
        _generateExperiment $M $probTrue
    done
}

# Call runExperiments with parameters
# Usage: ./script.sh [M] [probTrue] [N]

fifo_mq_generate(){
  _runExperiments "$@"
}
