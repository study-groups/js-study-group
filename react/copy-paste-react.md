# Single File App

A "single file app" is a self-contained, text encoded buffer that, when pasted into a browser's address URL bar, will render a responsive HTML/JS/CSS application.

## Serverless React
To run React code without a server, you need to include three packages via a content delivery network:
1. React library
2. React-Dom library
3. Babel library

In addition, your browser must some way load the React code. To cut and paste code directly into your browser's URL bar, you may change the protocol from HTTP to [**raw data**]( 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
).

By adding the following to your code: `data:text/html,`You can cut-n-paste a single file into your browser bar run React without a hosting server.

## copy-paste-react

Copy and paste this code into your browser's URL input:

```javascript
data:text/html,
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
```

# Analysis
## Babel

After loading a page that connects to `unpkg.com/babel-standalone` You can use Babel in a browser development console:

```javascript
code=`Insert code here.`
code_babel=Babel.transform(code,{presets:["es2015", "react"]})
console.log(code_babel.code)
```
Babel allows the use of JSX syntax. It turns the `tick()` function from this:

```javascript
function tick() {
  let element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

To this:

```javascript
//tick() function after Babel.
"'use strict';

function tick() {
  var element = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Hello, world!'
    ),
    React.createElement(
      'h2',
      null,
      'It is ',
      new Date().toLocaleTimeString(),
      '.'
    )
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);"
```


## DOM element traversal
Like any React app, this one is grabbing `<div id='root'>`and modifying it and its children. A `<div>` element is represented in the DOM as `HTMLDivElement` whose inheritance chain is:

`HTMLDivElement > HTMLElement > Element > Node > EventTarget`

Recall JS API to DOM:

``` javascript
//Topmost DOM elements
document.children[0]  // HTML element wit both head and body
document.children[0].children[0]  // same as document.head
document.children[0].children[1]  // same as document.body
```

The DOM element `id ='root'` is found at the top of the DOM tree because we put a `<div id='root'></div>` in the original HTML. 
```
// root is same as document.children[1].children[0]
let root=document.body.firstElementChild; 
root.constructor: HTMLDivElement
root.childrenElementCount: 1
root.innerHTML:
"<div> <h1>Hello, world!</h1> <h2>It is 4:11:00 PM.</h2> </div>"
```


<div class="code-title">
Body is document.children[1]. First child is <div\> from HTML
</div>

## Investigating the DOM in the Debug terminal

Rather drill down into `document.body.children`,  we could have grabbed the node with `getElementById('root')`.  But this example wanted to show how to start at the top (`document.body`) and navigate via indexing. That is, `document.children[1].children[0]` is the same as `document.body.children[0]`. 

Note that even though `<body>` tag was not specified in our code, the first `<div id='root'>` in the HTML maps to first child of `document.body`.

As we have seen, `document.children[1].children[0]` is the same as `document.body.children[0]` which is of type [HTMLBodyElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) .

## In summary, "copy-paste-react" enables sandbox testing in the browser.

By adding `data:text/html,` the beginning of our HTML code, we are able to copy and paste our code into the URL of a browser. And by including React, ReactDOM and Babel from  [unpkg](https://unpkg.com/) we are able to provide Babel translation of JSX directly in the browser.

To validate that React was doing it's job an just updating that which needed change, we investigated the DOM in realtime by writing out values of top node of the body tree: `document.body.children[0]` and we saw React was re-rendering only the dynamic time element.

