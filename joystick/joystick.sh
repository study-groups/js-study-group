WS_HOST=lenan.net
WS_PORT=9200

joystick-connect(){
  ./joystick 2> /dev/null | wscat -c $WS_HOST:$WS_PORT joystick.sh
}
