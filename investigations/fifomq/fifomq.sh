#!/bin/bash
# file: fifomq.sh
# A message queue relying on Linux process control (Kafka-esque)
# and relying on fifos with processing loops (Spark-like)

fifomq_create(){
  mkdir picoGen
  mkdir picoMeasure
  mkdir picoTerm
}

fifomq_destroy(){
  rm -r picoGen
  rm -r picoMeasure
  rm -r picoTerm
}


# Initialize FIFO and control flags
fifomq_init() {
    for dir in pico*/; do
        mkfifo "$dir/in"
        mkfifo "$dir/out"
        echo "off" > "$dir/onflag"
    done
}
