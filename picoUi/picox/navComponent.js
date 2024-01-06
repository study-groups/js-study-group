class NavbarComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(event) {
        const mode = event.target.getAttribute('data-mode');
        picoDebug && console.log("handleEventMode");
        this.app.handleMode(mode);
        event.preventDefault();
    }

    update(state) {
        const mode = state.mode;
        picoDebug && console.log("Navbar update mode is ", mode )
        this.element.querySelectorAll('ul li a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-mode') === mode) {
                item.classList.add('active');
                picoDebug && console.log("Found active mode ", mode )
            }
        });
    }
}