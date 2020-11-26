webtool-build-joystick(){

  # sketch.svg is cut-and-paste out of Stylus Lab's Write app.
  sketch_component=$(cat assets/sketch.svg); 

  # component implies internal state
  heart_component=$(
    export color=green; 
    export fill_color=#808; 
    export opacity=.3; 
    cat assets/heart.component | envsubst;
  );  

  # .html.env implies a file that has environment vars in it
  # envsubst replaces Bash environment variables (e.g. 
  # sketch_component and heart_component).
  cat index.html.env | envsubst > index.html
}
