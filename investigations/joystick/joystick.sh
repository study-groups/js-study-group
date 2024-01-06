WS_HOST=study-groups.org
WS_PORT=9200
JOYSTICK_DEV=/dev/input/js1

joystick-connect(){
  ./joystick $JOYSTICK_DEV 2> /dev/null | \
   wscat -c $WS_HOST:$WS_PORT joystick.sh
}
