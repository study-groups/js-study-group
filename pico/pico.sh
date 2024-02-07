
if [ -z "$PICO_ROOT" ]; then
    PICO_ROOT=$(pwd)
fi
PICO_ROOT=$(realpath $PICO_ROOT)

pico_help(){

cat <<EOF
 PicoSystem provides real-time telemetry using
- bash for build
- Server Side Events
- Custom Pub/Sub based on PicoObject
Need to set PICO_ROOT
PICO_ROOT=$PICO_ROOT
EOF
}

pico_run(){
    export PICO_ROOT
    python $PICO_ROOT/pico.py
}

