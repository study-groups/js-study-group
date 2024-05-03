#!/bin/bash
pico_repeat_command() {
    local interval=$1
    local cmd="$2"  # Encapsulate command in quotes to handle spaces properly
    shift 2
    while true; do
        eval "$cmd"  # Evaluate the command string as shell commands
        sleep $interval
    done
}

# Initialize log directory
pico_init() {
  export PICO_DIR=./db
  export PICO_SRC=./agents
  mkdir -p "$PICO_DIR"  # Ensure log directory exists
  export PICO_ID=$(date +%s)
  echo "pico_agent_init:"
  echo "  PICO_DIR=$PICO_DIR" >&2
  echo "  PICO_SRC=$PICO_SRC" >&2
}

# Fetch and log subscriber count
pico_agent_update() {
  local user="InspireSoul004"
  local url="https://www.youtube.com/@$user"
  local subs=$(python $PICO_SRC/get_subs_from_username.py "$url")
  local type="count.yt.subscribers"
  pico_store $type $user $subs
}

# Log subscriber data to a file
pico_store() {
  local id=$(date +%s)
  local type="$1"
  local data="${@:2}"
  local file=$PICO_DIR/$id.$type
  echo $id $type $data > $file 
  echo $id $type $data >&2
}

pico_fetch_by_type(){
  local type="$1"
  cat  $PICO_DIR/*.${type}
}

pico_ls_ORIG(){
 ls $PICO_DIR | cut -d '.' -f1 | xargs -I {} gdate -d "@{}" "+%Y-%m-%d %H:%M:%S"

}

pico_ls() {
    # List files in $PICO_DIR and process each file
    for file in "$PICO_DIR"/*; do
        # Extract the Unix timestamp from the filename
        timestamp=$(basename "$file" | cut -d '.' -f1)
        # Convert the timestamp to a human-readable date
        date_readable=$(gdate -d "@$timestamp" "+%Y-%m-%d %H:%M:%S")
        # Print the date followed by the content of the file, all in one line
        printf "%s " "$date_readable"
        cat "$file"
    done
}



pico_help(){
  cat << 'EOF'

  The single line Pico Object is

    <EPOCH_INT> <TYPE> <UTF-8 STRING><\n>

  They are stored in $PICO_DIR/$EPOCH_INT.$TYPE
  A file may contain a single object or many.

EOF
}
