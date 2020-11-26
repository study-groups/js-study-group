ws-serve-count(){
  echo "Navigate to http://localhost:9200/count.html"
  websocketd --port=9200 --staticdir=. ./count.sh
}

ws-serve-color(){
  echo "Navigate to http://localhost:9200/color.html"
  websocketd --staticdir=. --port=9200 ./color.sh
}

ws-serve-chat(){
  echo "Navigate to http://localhost:9200/chat.html"
  websocketd --staticdir=. --port=9200 ./chat.sh
}

ws-serve-chat-log(){
  echo "Navigate to http://localhost:9200/chat.html"
  websocketd --staticdir=. --port=9200 ./chat-log.sh
}
