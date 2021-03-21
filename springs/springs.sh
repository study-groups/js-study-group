PS1="springs> "

source ../webtool/webtool.sh

springs-build(){
  springs-make-head
  springs-make-content
  springs-make-js "$(cat ./springs.js)"
  springs-make-js "$(cat ./app.js)"
  springs-make-footer
}

springs-serve(){
  while true; do 
    springs-build > index.html
    (printf "HTTP/1.1 200 OK\n\n"; cat ${1:-"index.html"}) | 
    nc -l ${2:-2222} -q 1;
  done
}

springs-make-head(){
   local favicon="<link rel=\"icon\" href=\"data:;base64,iVBORw0KGgo=\">"

   webtool-make-header "$favicon"
}

springs-make-js(){
  echo "<script>$1</script>"
}

springs-make-footer(){
   webtool-make-footer $1
}

springs-make-content(){
cat <<EOF
<h1>Springs: harmonic ossciations</h1>
<p>
The harmonic oscilator relates <b>Mass</b> and <b>Restorative Force</b>
of a bounded sytem to it's Period of Oscilation. 
EOF
}
