# To use copy-paste-react:
# source cpr.sh
# cpr-make-example Saturn > index.html
# copy contents of index.html in paste buffer
# paste into the URL bar of browser
cpr-make-example(){
  local name=${1:-"world"}
  local date=$(date) # could be Compenents
  cat <<EOF
<!-- Copy and paste into your URL of browser: -->

data:text/html,
<html>
<p>
Copy-and-paste React example from
<a href="https://reactjs.org/docs/state-and-lifecycle.html">
state-and-lifecycle @ react.js
</a>
</p>
<script crossorigin 
  src="https://unpkg.com/react@16/umd/react.development.js">
</script>
<script crossorigin 
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js">
</script>
<script crossorigin 
  src="https://unpkg.com/babel-standalone@6.26.0/babel.js">
</script>
<!-- Following from: https://reactjs.org/docs/state-and-lifecycle.html -->
<div id='root'></div>
<script type="text/babel">
function tick() {
  let element = (
    <div>
      <h1>Hello, $name!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
      <p>Generated at $date. </p>
    </div>
  );  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
</script>
</html>
EOF
}
