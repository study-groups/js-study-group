class App {
    constructor() {
        this.state = {};
        this.listeners = [];
    }

    setState(newState) {
        console.log('Setting state:', newState);
        this.state = { ...this.state, ...newState };
        this.notifyAll();
    }

    registerComponent(component) {
        console.log('Registering component:', component);
        this.listeners.push(component);
    }

    notifyAll() {
        console.log('Notifying all components');
        this.listeners.forEach(component => component.update(this.state));
    }
}

class NavbarComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.element.querySelector('.hamburger').addEventListener('click', this.toggleMenu.bind(this));
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.addEventListener('click', this.changeMode.bind(this));
        });
    }

    toggleMenu() {
        console.log('Toggling menu');
        this.element.querySelector('ul').classList.toggle('visible');
    }

    changeMode(event) {
        const mode = event.target.getAttribute('data-mode');
        console.log('Changing mode to:', mode);
        this.app.setState({ mode });
        event.preventDefault();
    }

    update(state) {
        console.log('Updating NavbarComponent with state:', state);
        const mode = state.mode;
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-mode') === mode) {
                item.classList.add('active');
            }
        });
    }
}

class TextComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
    }

    update(state) {
        console.log('Updating TextComponent with state:', state);
        const mode = state.mode;
        this.element.textContent = mode;
    }
}

const app = new App();


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const navbar = new NavbarComponent('navbar', app);
    app.registerComponent(navbar);
    const mainText = new TextComponent('mode-display', app);
    app.registerComponent(mainText);

    const mode = localStorage.getItem('mode');
    if (mode) {
        console.log('Setting initial mode to:', mode);
        app.setState({ mode });
    }


});