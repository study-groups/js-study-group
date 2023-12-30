
class NavbarComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.addEventListener('click', this.handleEventMode.bind(this));
        });
    }

    handleEventMode(event) {
        const mode = event.target.getAttribute('data-mode');
        console.log("handleEventMode");
        this.app.handleMode(mode);
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
            this.element.style.textAlign = 'center';
        }
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
            this.then = performance.now();
            requestAnimationFrame(this.render);
        }
    }

    stopRendering() {
        this.isRendering = false;
    }

    calculateFPS(now) {
        this.frameCount++;
        const deltaTime = now - this.lastRenderTime;
        if (deltaTime > 1000) {
            const fps = this.frameCount / (deltaTime / 1000);
            console.log(`FPS: ${fps}`);
            this.frameCount = 0;
            this.lastRenderTime = now;
        }
    }

    updateDOM(displayObjects) {
        this.element.innerHTML = `<div class="outputComponent"><article></article></div>`; // Clear the existing content
        const articleElement = this.element.querySelector('article');
        displayObjects.forEach(obj => {
            const newElement = document.createElement('div');
            newElement.textContent = obj.data ? `dT: ${obj.delta}, Type: ${obj.type}, x: ${obj.data.x}, y: ${obj.data.y}` : `dT: ${obj.delta}, Type: ${obj.type}, x: undefined, y: undefined`;
            articleElement.appendChild(newElement);
        });
    }

    render(now) {
        if (!this.isRendering) return;
        this.calculateFPS(now);
        const displayObjects = this.picoObjects.slice(-this.limit).map((obj, index, arr) => {
            obj.delta = index === 0 ? 0 : obj.id - arr[index - 1].id;
            return obj;
        });
        this.updateDOM(displayObjects);
        requestAnimationFrame(this.render);
    }

    updateObj(picoObj) {
        if (typeof picoObj !== 'object' || !picoObj.hasOwnProperty('id')) return;
        this.picoObjects.push(JSON.parse(JSON.stringify(picoObj)));
        if (this.picoObjects.length > this.limit) {
            this.picoObjects.shift();
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
            this.element.innerHTML = `
            <div class="settingsComponent">
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
                    <li><a href="../v1-bootstrap-grid/">Bootstrap grid</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
          </div>
            `;
            themeSwitcher.init();

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

        switchTo(componentId) {
            false && console.log('switchTo ', componentId);
            this.activeComponent = componentId;
            this.inputComponent.element.style.display = (componentId === 'input') ? 'block' : 'none';
            this.outputComponent.element.style.display = (componentId === 'output') ? 'block' : 'none';
            this.settingsComponent.element.style.display = (componentId === 'settings') ? 'block' : 'none';
            this.defaultElement.style.display = (componentId === 'default') ? 'block' : 'none';
        }

        update(state) {
            false && console.log("MainComponent.update ", state);
            switch (state.mode) {
                case 'input':
                    this.inputComponent.update(state);
                    break;
                case 'output':
                    //this.outputComponent.updateObj(state.objects[0]);
                    break;
                case 'settings':
                   this.settingsComponent.update(state);
                    break;
                default:
                    break;
            }
        }
    }