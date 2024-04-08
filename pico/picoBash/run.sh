
pico_run_go(){
    echo "Running picoGo..."
    $PICO_ROOT/picoGo/pico
    if [ $? -eq 0 ]; then
        echo "picoGo is running."
    else
        echo "Failed to run picoGo."
    fi

    
}

pico_run_default(){
    cd $PICO_ROOT/picoUi/default
    local port=${1:-8000}
    python -m http.server $port &
    server_pid=$!

    echo "Use kill_server to kill the server."
}

pico_kill_server() {
    if [ ! -z "$server_pid" ]; then
        echo "Killing server with PID $server_pid"
        kill $server_pid
    fi
}

pico_run_py(){
    export PICO_ROOT
    python $PICO_ROOT/picoPy/pico.py
    if [ $? -eq 0 ]; then
        echo "picoPy is running."
    else
        echo "Failed to run picoPy."
    fi
}
