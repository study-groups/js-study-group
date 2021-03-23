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

webtool-server-nc(){
  while true; do
    webtool-build-hook
    (printf "HTTP/1.1 200 OK\n\n"; cat ${1:-"index.html"}) |
    nc -l ${2:-1234} -q 1;
  done
}

webtool-build-hook(){
  echo "override this function" > /dev/null
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
