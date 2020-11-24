cpr-make-page(){
CPR_DATE=$(date)
cat <<EOF
<html> 
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<!-- Following from: https://reactjs.org/docs/state-and-lifecycle.html -->
<div id='root'></div>
<script type="text/babel">
function tick() {
  let element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
      <p>Generated from Cut and Paste React at $CPR_DATE. </p>
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

cpr-serve(){
echo ""
echo "Copy the following and paste into your URL of browser:"
echo ""
echo "data:text/html,"
cpr-make-page
}
