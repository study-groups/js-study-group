class PicoX {
    constructor(debug = false) {
        this.debug = debug;
        this.debugObservable=false;
        this.currentReaction = null;
        this.reactions = new Map();
    }

    observable(obj) {
        const picox = this;
        return new Proxy(obj, {
            get(target, key) {
                picox.debugObservable &&
                    console.log(`Getting property ${key}`);
                if (picox.currentReaction) {
                    if (!picox.reactions.has(key)) {
                        picox.reactions.set(key, new Set());
                    }
                    picox.reactions.get(key).add(picox.currentReaction);
                }
                return target[key];
            },
            set(target, key, value) {
                if (target[key] === value) {
                    return true; // No value change, no need to trigger reactions
                }
                picox.debugObservable &&
                    console.log(`Setting property ${key} to ${value}`);
                target[key] = value;
                if (picox.reactions.has(key)) {
                    picox.reactions.get(key).forEach(reaction => reaction());
                }
                return true;
            }
        });
    }

    reaction(observableFn, reactionFn) {
        this.currentReaction = reactionFn; // Set current reaction to the reaction function
        observableFn(); // Run observable function to register the reaction
        this.currentReaction = null; // Clear current reaction
    }
}

/*
class PicoData {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class PicoObject {
    constructor(id, domId, type, data) {
        this.id = id;
        this.domId = domId;
        this.type = type;
        this.data = data;
    }
}
*/

class App {
    constructor() {
        this.debug = false; // Set this to false to disable debugging
        this.picox = new PicoX(this.debug);
        this.maxLogLines=10;
        this.state = this.picox.observable({
            mode: 'default',
            objects: [],
            // Other state properties...
        });

          // Init
        themeSwitcher.init();
        this.initializeComponents();
        this.state.mode=this.loadState().mode;
        console.log('Observable state:', this.state);
        window.addEventListener('pointermove', this.handlePointerMove.bind(this));

    }

    initializeComponents() {
        this.navbar=new NavbarComponent('navbar', this);
        this.main= new MainComponent("main", this);
        this.footer=new FooterComponent('footer',this);
        this.registerComponentState(this.navbar);
        //this.registerComponent(this.footer);

        //this.registerComponentState(this.main);
        this.picox.reaction(
            () => this.state.objects,
            () => this.main.update(this.state)
        );

        this.picox.reaction(
            () => this.state.objects,
            () => this.footer.update(this.state)
        );
    }

    loadState() {
        const defaultState = { mode: 'input' };
        const stateKey = 'appState'; // Use a consistent key for saving/loading state

        try {
            this.debug && console.log('Lookingfor localStorage key:',stateKey);

            const savedState = localStorage.getItem(stateKey);
            this.debug &&  console.log('Found state:',savedState);

            if (savedState) {
                const parsedState = JSON.parse(savedState);
                this.debug && console.log('parsedState:',parsedState);
                return parsedState;
            }
        } catch (error) {
            // It might be beneficial to handle specific types of errors differently
            // For example, a SyntaxError indicates invalid JSON.
            if (error instanceof SyntaxError) {
                console.error('Error parsing state:', error);
            } else {
                console.error('Error loading state:', error);
            }
        }

        // If we reach here, it means there was no saved state or an error occurred
        // Log a message if debugging is enabled
        this.debug && console.warn('No saved state found or error occurred. Using default state.');
        return defaultState;
    }

    saveState() {
        const stateKey = 'appState'; // Consistent key for localStorage
        try {
            // Create a clean object from the state's own properties
            const stateToSave = Object.keys(this.state).reduce((obj, key) => {
                obj[key] = this.state[key];
                return obj;
            }, {});

            this.debug && console.log('Saving state:', stateToSave);
            this.debug && console.log("attempting to saveState",stateToSave)

            localStorage.setItem(stateKey, JSON.stringify(stateToSave));
        } catch (error) {
            // Detailed error logging
            if (this.debug) {
                console.error('Error saving state to localStorage:', error.message);
                console.error('Failed state:', this.state);
            }
        }
    }


    setState(newState) {
        this.debug && console.log('Setting state, old new:', this.state, newState);
        Object.assign(this.state, newState);
        this.saveState();
    }

    registerComponentState(component) {
        this.debug && console.log('Registering component:', component);
       // this.components.push(component);
        this.picox.reaction(
            () => this.state.mode,
            () => component.update(this.state)
        );
    }

    handlePointerMove(event) {
        // Create a PicoObject for the event
        const picoObject = {
            id: Date.now(), // Unix timestamp in milliseconds
            domId: event.target.id,
            type: event.type,
            data: {
                x: event.clientX,
                y: event.clientY,
                // Other event properties...
            },
        };

        // Update state
        this.setState({
            objects: [
                ...this.state.objects.slice(
                    Math.max(this.state.objects.length -
                        this.maxLogLines + 1, 0)),
                picoObject
            ],
        });
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });


/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2023 - Licensed under MIT
 */

const themeSwitcher = {
    // Config
    _scheme: "auto",
    menuTarget: "details[role='list']",
    buttonsTarget: "a[data-theme-switcher]",
    buttonAttribute: "data-theme-switcher",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",

    // Init
    init() {
      this.scheme = this.schemeFromLocalStorage;
      this.initSwitchers();
    },

    // Get color scheme from local storage
    get schemeFromLocalStorage() {
      if (typeof window.localStorage !== "undefined") {
        if (window.localStorage.getItem(this.localStorageKey) !== null) {
          return window.localStorage.getItem(this.localStorageKey);
        }
      }
      return this._scheme;
    },

    // Preferred color scheme
    get preferredColorScheme() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    },

    // Init switchers
    initSwitchers() {
      const buttons = document.querySelectorAll(this.buttonsTarget);
      buttons.forEach((button) => {
        button.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            // Set scheme
            this.scheme = button.getAttribute(this.buttonAttribute);
            // Close dropdown
            document.querySelector(this.menuTarget).removeAttribute("open");
          },
          false
        );
      });
    },

    // Set scheme
    set scheme(scheme) {
      if (scheme == "auto") {
        this.preferredColorScheme == "dark" ? (this._scheme = "dark") : (this._scheme = "light");
      } else if (scheme == "dark" || scheme == "light") {
        this._scheme = scheme;
      }
      this.applyScheme();
      this.schemeToLocalStorage();
    },

    // Get scheme
    get scheme() {
      return this._scheme;
    },

    // Apply scheme
    applyScheme() {
      document.querySelector("html").setAttribute(this.rootAttribute, this.scheme);
    },

    // Store scheme to local storage
    schemeToLocalStorage() {
      if (typeof window.localStorage !== "undefined") {
        window.localStorage.setItem(this.localStorageKey, this.scheme);
      }
    },
  };


