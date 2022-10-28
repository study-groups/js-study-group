#!/bin/bash
#node="/snap/bin/node"
node="node"
node_server="$HOME/src/js-study-group/webtool/node-server.js"

webtool-build-hook(){
  echo "Webtool using default webtool-build-hook " > /dev/stderr
  echo "Define webtool-build-hook in your script to override. " > /dev/stderr
  echo "Typically used to automatically rebuild index.html. " > /dev/stderr
  echo "Or ignore and manually run your " > /dev/stderr
  echo "app-build function before starting webtool-server. " > /dev/stderr
}


webtool-python-server-start(){
  python3 -m http.server ${1:-8000} &
}

webtool-python-server-list(){
  ps -ef | grep [h]ttp.server
}

webtool-python-server-stop-all(){
  kill $(ps aux | grep '[h]ttp.server' | awk '{print $2}')
  PS1="webtool> "
}

webtool-server-ip(){
  hostname -I | awk '{print $1}'
}

webtool-node-server() {
  local node_cmd="$(which node)"
  local user_dir=$HOME
  local node_file="$user_dir/src/js-study-group/webtool/node-server.js"
  local port=${1:-"1234"}
  local html_dir=${3:-"$user_dir/src/js-study-group/webtool/html"};
  local json_dir=${4:-"$user_dir/src/js-study-group/json"};

  #local ip="$(webtool-server-ip)"
  local ip="127.0.0.1"

 echo  $node $node_file $port $html_dir $json_dir  $ip
}

webtool-netcat-server(){
  local port=${1:-"1234"}
  local file=${2:-"index.html"}
  local ip="$(webtool-server-ip)"

  echo "Open http://$ip:$port" > /dev/stderr

  while true; do
    webtool-build-hook
    (printf "HTTP/1.1 200 OK\n\n"; cat $file ) |
    nc -l $port -q 1;
  done
}

webtool-server-start(){
  python3 -m http.server ${1:-8000} &
}

webtool-server-list(){
  ps -ef | grep [h]ttp.server
}

webtool-server-stop-all(){
  kill $(ps aux | grep '[h]ttp.server' | awk '{print $2}')
}

webtool-server-ip(){
  hostname -I | awk '{print $1}'
}
