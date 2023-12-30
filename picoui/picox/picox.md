# PicoX: A Simple Reactive Model

PicoX is a simple implementation of a reactive model, similar to [MobX](https://mobx.js.org/README.html), but it's not using MobX or any other reactive library. It's a vanilla JavaScript implementation of a reactive model.

## Observables

The \`PicoX\` class is a simple implementation of observables, similar to MobX. It uses JavaScript's \`Proxy\` to intercept get and set operations on an object, making it observable. When a property is accessed (get operation), the current reaction (if any) is registered as a dependency for that property. When a property is changed (set operation), all reactions dependent on that property are triggered.

```javascript
class PicoX {
  constructor(target) {
    // ...
  }
}
```

## Reactions

The \`reaction\` method in the \`PicoX\` class is used to create reactions. A reaction is a function that runs when its dependencies change. This is similar to MobX's \`autorun\` or \`reaction\`.

```javascript
class PicoX {
  // ...
  reaction(fn) {
    // ...
  }
}
```

## State Management

The \`App\` class uses \`PicoX\` to create an observable state. It also provides methods to save and load the state from \`localStorage\`, and to set the state and trigger updates.

```javascript
class App {
  constructor() {
    // ...
  }
}
```

## Component-based Architecture

The \`App\` class also initializes and updates components based on the state. This is similar to how MobX can be used with a component-based architecture like React.

```javascript
class App {
  // ...
  update() {
    // ...
  }
}
```

## Differences from Other Reactive Models

1. **Manual Dependency Tracking**: Unlike MobX which automatically tracks dependencies during the execution of a computed function or a reaction, this code requires dependencies to be manually registered by accessing them inside the observable function passed to \`reaction\`.

2. **No Computed Values**: Unlike MobX or Vue.js, this code does not support computed values. All values in the state are plain values and not computations based on other values.

3. **No Middleware or Devtools**: Unlike MobX or Redux, this code does not support middleware or come with devtools for time-travel debugging, logging, etc.

In summary, PicoX implements a simple reactive model with observables and reactions, similar to MobX. It's a lightweight solution for state management and reactive programming in JavaScript. However, it lacks some of the advanced features of MobX and other reactive libraries, such as automatic dependency tracking, computed values, middleware, and devtools.
EOF
}