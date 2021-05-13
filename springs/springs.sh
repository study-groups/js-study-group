PS1="springs> "

source ../webtool/webtool.sh

springs-build(){
  springs-make-head
  springs-make-content
  echo "<script>"
  cat ./WaveMachine.js
  cat ./ValueMapper.js
  cat ./Slider.js
  cat ./bibeats.js
  cat ./springs.js
  cat ./app.js
  echo "</script>"
  springs-make-footer
}

# aggressively kill all children
springs-kill(){
  pkill -P $$
}

springs-serve(){
  while true; do 
    source springs.sh
    springs-build > index.html;
    (printf "HTTP/1.1 200 OK\n\n"; cat ${1:-"index.html"}) | 
    nc -l ${2:-2222} -q 1;
  done
}

springs-make-head(){
   local nl=$'\n'
   css="$nl<style>$nl$(cat ./style.css)$nl</style>"
   local favicon="<link rel=\"icon\" href=\"data:;base64,iVBORw0KGgo=\">"
   webtool-make-header "$favicon $css"
}

springs-make-js(){
  printf "<script>$1</script>"
}

springs-make-footer(){
   webtool-make-footer "ver 002pre1c"
}

springs-make-content(){
cat <<EOF
<main role="main">
    <h1>Springs: harmonic oscillations</h1>
    <p>
      The harmonic oscillator relates <b>mass</b> and <b>restorative force</b>
      of a bounded sytem to it's <b>period of oscillation</b>. 
    </p>
    <wave-machine id="wave-machine">wavemachine</wave-machine>
    <value-mapper id="mapper">mapper</value-mapper>
    <div id="controller"></div>
</main>
EOF
}
