#!/bin/bash
node="/snap/bin/node"
node_server="/home/admin/src/js-study-group/webtool/node-server.js"

webtool-build-hook(){
  echo "Webtool using default webtool-build-hook " > /dev/stderr
  echo "Define webtool-build-hook in your script to override. " > /dev/stderr
  echo "Typically used to automatically rebuild index.html. " > /dev/stderr
  echo "Or ignore and manually run your " > /dev/stderr
  echo "app-build function before starting webtool-server. " > /dev/stderr
}

webtool-node-server() {
  # webtool-build-hook
  # $1: file to run
  # $@: additional args (port, html_path, json_path)
  $node $node_server "${@:1}"
}

webtool-set-root(){
  WEBTOOL_ROOT=$1;
}

webtool-server-start(){
  python3 -m http.server ${1:-8000} &
  PS1="webtool-server> "
}

webtool-server-list(){
  ps -ef | grep [h]ttp.server
}

webtool-server-stop-all(){
  kill $(ps aux | grep '[h]ttp.server' | awk '{print $2}')
  PS1="webtool> "
}

webtool-server-ip(){
  hostname -I | awk '{print $1}'
}

webtool-server-nc(){
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


webtool-make-header(){
  # This uses Bash's Heredoc syntax of <<WORD to specify stdio
  # which cat will echo back to stdout after variable substituitons, etc.
  cat <<EOF
<html>
<head>
$1
</head>
<body>
EOF
}

webtool-make-footer(){
  cat <<EOF
</body>
<footer>
$1
</footer>
</html>
EOF
}

# DEVELOPMENT
webtool-make-svg(){
  local svgInputFile=$1;
  local svg=$(cat $svgInputFile)
  cat<<EOF
$svg
EOF
}
