export PORT=5001
export IP=0.0.0.0
export DIR=./demo
export FIFO=$DIR/fifo

_create_npm() {

  read -p "Using $DIR, continue? (y/n) " answer
  if [[ $answer == "y" ]]; then
    mkdir $DIR 2>/dev/null
  else
    echo "Operation cancelled."
    return
  fi

  cd $DIR

  # Initialize a new npm project
  npm init -y

  # Install Express
  npm install express

  # Install Jest for unit testing
  npm install --save-dev jest
}


_create_server_js() {
  # Create a basic server file
  cat <<EOF >server.js
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://\${process.env.IP}:\${port}\`);
});
EOF

  # Update test script in package.json
  sed -i '' 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"test": "jest"/g' package.json

}

create_unit_test() {
  # Navigate to the project directory
  cd $DIR

  # Install Jest
  npm install --save-dev jest

  # Create a test directory
  mkdir __tests__

  # Create a sample test file
  cat <<EOF >__tests__/sample.test.js
const sum = (a, b) => a + b;

test('sum adds numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
EOF

  # Update test script in package.json
  sed -i '' 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"test": "jest"/g' package.json
}

create_node_project() {
  _create_npm
  _create_server_js
}
