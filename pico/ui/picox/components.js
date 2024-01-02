class FooterComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
    }
    update(state) {
        picoDebug && console.log("FooterComponent::update(message)", state);
        const lastThreePointers = state.objects.slice(-3);
        let textContent = '';
        lastThreePointers.forEach(pointer => {
            const dataAsJson = JSON.stringify(pointer.data);
            textContent += `<div>
            ID: ${pointer.id}, Type: ${pointer.type}, Data: ${dataAsJson}
            </div>`;
        });
        this.element.innerHTML = textContent;
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
            picoDebug && console.log("InputComponent::update(state)", state);
            this.element.textContent = state.mode;
            this.element.style.textAlign = 'center';
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
                  // this.settingsComponent.update(state);
                    break;
                default:
                    break;
            }
        }
    }
