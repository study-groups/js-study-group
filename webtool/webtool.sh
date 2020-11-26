webtool-set-root(){
  WEBTOOL_ROOT=$1;
}

webtool-make-svg(){
  local svgInputFile=$1;
  local svg=$(cat $svgInputFile)
  cat<<EOF
$svg
EOF
}

webtool-server(){
while true; do 
	  echo -e "HTTP/1.1 200 OK\n\n $(cat $1)" | nc -l -p 1500 -q 1
  done
}
webtool-make-header(){
  # This uses Bash's Heredoc syntax of <<WORD to specify stdio 
  # which cat will echo back to stdout after variable substituitons, etc.
  cat <<EOF
<html>
<head>
</head>
<body>
EOF
}

webtool-make-footer(){
  cat <<EOF
</body>
</html>
EOF
}
