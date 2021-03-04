WEBSOCKET_CMD=$PWD/websocketd
WS_PORT=9200
WS_HOST=js.study-groups.org
WS_APP=default

PS1="ws:$WS_APP:$WS_HOST:$WS_PORT> "

ws-clean(){
  rm *.html
}

ws-serve-socket(){
  $WEBSOCKET_CMD --port=$1  ./$2
}

ws-serve-page-and-socket(){
  export WS_HOST
  export WS_PORT
  export WS_APP
  WS_APP=$1
  cat $1.html.env | envsubst > $1.html
  echo "Navigate to http://$WS_HOST:$WS_PORT/$1.html"
  $WEBSOCKET_CMD --port=$WS_PORT --staticdir=. ./$1.sh
}
