# js-study-group
Asynchronous JavaScript, mainly front-end.

| file | info |
|---|---|
|js.sh | Tools for installing and using JSON, NVM, NodeJs and Express | 
|flashcard | Minimal React app without node_modules |
| joystick | Realtime data from server data to webpage |
|mvc | Model, View, Controller examples |
| react | React without npm, node and  node_modules |
| wavemachine |  WebComponent, ShadowDOM example  |
| tails | Unix tail aggregator  via websocket  |
| dashboard | Client/server with periodic fetch  |

## dashboard

Bash scripts are used to gather env variables and builds a single index.html file containing JS,HTML+CSS delivered by Node's [http module](https://nodejs.org/api/http.html#http), e.g. `require('node:http')`, no `npm` or  `node_modules`.