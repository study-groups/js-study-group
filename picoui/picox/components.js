
class NavbarComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.addEventListener('click', this.changeMode.bind(this));
        });
    }

    changeMode(event) {
        const mode = event.target.getAttribute('data-mode');
        this.app.setState({ ...this.app.state, mode: mode });
        event.preventDefault();
    }

    update(state) {
        const mode = state.mode;
        console.log("Navbar update mode is ", mode )
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-mode') === mode) {
                item.classList.add('active');
                console.log("Found active mode ", mode )

            }
        });
    }
}

class FooterComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
    }

    update(state) {
        return;
        false && console.log("FooterComponent::update(message)", state);
        const lastThreePointers = state.pointers.slice(-3);
        let textContent = '';
        lastThreePointers.forEach(pointer => {
            const dataAsJson = JSON.stringify(pointer.data);
            textContent += `ID: ${pointer.id}, Type: ${pointer.type}, Data: ${dataAsJson}\n`;
        });
        this.element.textContent = textContent;
        this.element.style.textAlign = 'center';
    }
}

    class InputComponent {
        constructor(elementId, app) {
            this.element = document.getElementById(elementId);
            if (!this.element) {
                throw new Error(`Element with id "${elementId}" does not exist`);
            }
            this.app = app;
        }

        update(state) {
            false && console.log("InputComponent::update(state)", state);
            this.element.textContent = state.mode;
            this.element.style.textAlign = 'center';        }
    }

    class OutputComponent {
        constructor(elementId, app) {
            this.element = document.getElementById(elementId);
            this.app = app;
            this.limit = 10;
            this.picoObjects = [];
            this.isRendering = false;
            this.lastRenderTime = performance.now();
            this.frameCount = 0;
            this.render = this.render.bind(this); // Bind once for performance
        }

        startRendering() {
            if (!this.isRendering) {
                this.isRendering = true;
                this.render();
            }
        }

        stopRendering() {
            this.isRendering = false;
        }

        render() {
            if (!this.isRendering) {
                return;
            }

            // Calculate FPS
            this.frameCount++;
            const now = performance.now();
            const deltaTime = now - this.lastRenderTime;
            if (deltaTime > 1000) { // Update FPS every second
                const fps = this.frameCount / (deltaTime / 1000);
                console.log(`FPS: ${fps}`);
                this.frameCount = 0;
                this.lastRenderTime = now;
            }

            // Generate text
            const displayObjects = this.picoObjects.slice(-this.limit);
            //console.log(displayObjects); // Log the contents of displayObjects
            this.element.innerHTML = ''; // Clear the existing content
            for (let i = 0; i < displayObjects.length; i++) {
                const deltaTime = i === 0 ? 0 : displayObjects[i].id - displayObjects[i - 1].id;
                const newElement = document.createElement('div');
                if (displayObjects[i].data) {
                    newElement.textContent = `dT: ${deltaTime}, Type: ${displayObjects[i].type}, x: ${displayObjects[i].data.x}, y: ${displayObjects[i].data.y}`;
                } else {
                    newElement.textContent = `dT: ${deltaTime}, Type: ${displayObjects[i].type}, x: undefined, y: undefined`;
                }
                this.element.appendChild(newElement);
            }

            // Request the next animation frame
            requestAnimationFrame(this.render);
        }

        updateObj(picoObj) {
            // Check if picoObj is an object and has an id property
            if (typeof picoObj !== 'object' || !picoObj.hasOwnProperty('id')) {
                return;
            }

            // Create a deep copy of picoObj
            const picoObjCopy = JSON.parse(JSON.stringify(picoObj));

            // Add the new picoObj to the picoObjects array
            this.picoObjects.push(picoObjCopy);

            // If the number of picoObjects exceeds the limit, remove the oldest one
            if (Array.isArray(this.picoObjects) && this.picoObjects.length > this.limit) {
                this.picoObjects.shift();
            }

            // Check the app mode to decide whether to render
            if (this.app.state.mode === 'settings' || this.app.state.mode === 'input') {
                this.stopRendering();
            } else {
                this.startRendering();
            }
        }

    }
    class SettingsComponent {
        constructor(elementId, app) {
            this.element = document.getElementById(elementId);
            this.app = app;
        }

        update(state) {
            false && console.log("SettingsComponent::update(state)", state);
            this.element.textContent ='Settings';
            this.element.style.textAlign = 'center';

            // Add this to update
            this.element.innerHTML = `
            <nav>
            <ul>
              <li>
                <details role="list">
                  <summary aria-haspopup="listbox" role="button" class="secondary">Theme</summary>
                  <ul role="listbox">
                    <li><a href="#" data-theme-switcher="auto">Auto</a></li>
                    <li><a href="#" data-theme-switcher="light">Light</a></li>
                    <li><a href="#" data-theme-switcher="dark">Dark</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <details role="list">
                  <summary aria-haspopup="listbox">Examples (v1)</summary>
                  <ul role="listbox">
                    <li><a href="../v1-preview/">Preview</a></li>
                    <li><a href="../v1-preview-rtl/">Right-to-left</a></li>
                    <li><a href="../v1-classless/">Classless</a></li>
                    <li><a href="../v1-basic-template/">Basic template</a></li>
                    <li><a href="../v1-company/">Company</a></li>
                    <li><a href="../v1-google-amp/">Google Amp</a></li>
                    <li><a href="../v1-sign-in/">Sign in</a></li>
                    <li><a href="../v1-bootstrap-grid/">Bootstrap grid</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
            `;
        }
    }

    class MainComponent {
        constructor(elementId, app) {
            this.element = document.getElementById(elementId);
            this.app = app;
            this.inputComponent = new InputComponent('input', app);
            this.outputComponent = new OutputComponent('output', app);
            this.settingsComponent = new SettingsComponent('settings', app);
            this.defaultElement = document.getElementById('default');
            this.activeComponent = 'default';
            false && console.log('MainComponent constructor finished.');
        }

        switchTo(component) {
            false && console.log('switchTo ', component);
            this.activeComponent = component;
            this.inputComponent.element.style.display = (component === 'input') ? 'block' : 'none';
            this.outputComponent.element.style.display = (component === 'output') ? 'block' : 'none';
            this.settingsComponent.element.style.display = (component === 'settings') ? 'block' : 'none';
            this.defaultElement.style.display = (component === 'default') ? 'block' : 'none';
        }

        update(state) {
            false && console.log("MainComponent.update ", state);
            this.switchTo(state.mode);
            switch (state.mode) {
                case 'input':
                    this.inputComponent.update(state);
                    break;
                case 'output':
                    this.outputComponent.updateObj(state.objects[0]);
                    break;
                case 'settings':
                    this.settingsComponent.update(state);
                    break;
                default:
                    // Handle the default case
                    break;
            }
        }
    }