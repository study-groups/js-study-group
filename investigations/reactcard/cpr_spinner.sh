
#!/bin/bash
# Spinner added by 

# Function to create a copy-and-paste React app with a modulo 16 spinner and a card component.
cpr-make-example() {
  local name=${1:-"world"}
  local date=$(date)
  cat <<EOF
data:text/html,
<html>
<head>
  <title>Copy-and-Paste React App</title>
</head>
<body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

  <div id='root'></div>
  <script type="text/babel">
    function Spinner() {
      const [count, setCount] = React.useState(0);

      React.useEffect(() => {
        const interval = setInterval(() => {
          setCount((prevCount) => (prevCount + 1) % 16);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

      return <div>Spinner Count: {count}</div>;
    }

    function Card({ title, content }) {
      return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );
    }

    function App() {
      return (
        <div>
          <Spinner />
          <Card title={"Hello, " + $name} content={"Generated at " + $date} />
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>
EOF
}
