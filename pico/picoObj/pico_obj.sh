pico_obj_make_pipe(){
  mkfifo ./obj_pipe
}
pico_obj_read_from_pipe() {
  local pipe=${1:-./obj_pipe}
  while IFS= read -r line < $pipe; do
    echo "Read: $line"
  done
  echo "Pipe closed or error encountered, stopping read."
}
