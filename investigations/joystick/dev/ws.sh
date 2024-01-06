#WEBSOCKET_CMD=$PWD/websocketd
WEBSOCKET_CMD=websocketd
export WS_PORT=9200
export WS_HOST=js.study-groups.org
export WS_APP=default

PS1="ws:$WS_APP:$WS_HOST:$WS_PORT> "

ws-clean(){
  rm *.html
}

ws-build(){
  for file in $(ls *.env); do
    basename=$(basename $file .env)
    cat $file | envsubst > $basename.html 
  done;
}

ws-serve-socket(){
  $WEBSOCKET_CMD --devconsole --port=$1  ./$2 
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
