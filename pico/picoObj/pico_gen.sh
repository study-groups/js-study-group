pico_gen_words() {
  local sleep_time_ms="${1:-100}" # 100 ms between generations
  local pipe="${2:-./obj_pipe}"
  local start_time=$(date +%s%3N)  # Start time of the period
  local num_lines=0
  local N=3
  echo "Using pipe:$pipe"
  echo "Using sleep_time_ms: $sleep_time_ms"
  while true
  do
    local words=()  # Array to hold the generated words

    # Generate N random words
    for i in $(seq 1 $N); do
      words+=("$(shuf -n 1 /usr/share/dict/words)")
    done

    # Join words with space and write to the pipe
    local phrase="${words[*]}"
    echo "$phrase" > $pipe
    ((num_lines++))

    local current_time=$(date +%s%3N)  # Current time in milliseconds

    # If more than 250 ms have passed since start_time, print stats and reset
    if (( current_time - start_time >= 250 )); then
      echo "Generated $num_lines lines in the last 250 ms"
      num_lines=0
      start_time=$current_time  # Reset the start time
    fi

    # Sleep for the specified amount of time
    #sleep "$((sleep_time_ms / 1000)).$((sleep_time_ms % 1000))"
    sleep "$1"
  done
}
