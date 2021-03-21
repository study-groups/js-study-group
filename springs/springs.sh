PS1="springs> "

source ../webtool/webtool.sh

springs-build(){
  springs-make-head
  springs-make-content
  springs-make-js "$(cat ./springs.js)"
  springs-make-footer
}

springs-serve(){
  while true; do 
    (printf "HTTP/1.1 200 OK\n\n"; cat ${1:-"index.html"}) | 
    nc -l ${2:-2222} -q 1;
  done
}

springs-make-head(){
   webtool-make-header $1
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
