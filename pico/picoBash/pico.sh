#!/bin/bash
# This script provides utilities for the PicoSystem,
# including building and running components, and help
# documentation. It requires setting PICO_ROOT which 
# assumed to be one level above this file. picoBash/pico.sh
PICO_ROOT="$(cd ../"$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for file in $PICO_ROOT/picoBash/*.sh; do
    if [ "$(basename "$file")" != "pico.sh" ]; then
        source "$file"
    fi
done

PICO_TEXT_FILE=$PICO_ROOT/picoDb/current.txt

pico_help(){
cat <<EOF
   PicoSystem provides real-time telemetry using
    - bash for build
    - Server Side Events
    - Custom Pub/Sub based on PicoObject
   PICO_ROOT=$PICO_ROOT
   PICO_TEXT_FILE=$PICO_TEXT_FILE
EOF
}
