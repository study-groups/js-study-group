source ~/src/js-study-group/webtool/webtool.sh
webtool-build-joystick(){

  # sketch.svg is cut-and-paste out of Stylus Lab's Write app.
  export sketch_component=$(cat assets/sketch.svg); 

  # component implies internal state
  export heart_component="$(
    export id=heart_component;
    export color=green; 
    export fill_color=#808; 
    export opacity=.3; 
    # heart.component is svg + $variables above to be replaced 
    # by envsubst.
    cat assets/heart_component/element.html | envsubst
  )";

  export javascript_lib=$(cat ./assets/cssPubSub.js)
  export javascript_init=$(cat ./assets/heart_component/init.js)

  # .env.html implies a file that has environment vars in it
  # envsubst replaces Bash environment variables (e.g. 
  # sketch_component and heart_component).
  cat  index.env.html | envsubst 
}

joystick-help(){
cat << EOF
https://github.com/joewalnes/websocketd/releases

wget https://github.com/joewalnes/websocketd/releases/download/v0.4.1/websocketd-0.4.1-freebsd_amd64.zip
EOF
}
