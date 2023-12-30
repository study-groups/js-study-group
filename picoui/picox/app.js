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

        themeSwitcher.init();
        this.initializeComponents();
        console.log("Before this.state.mode", this.state.mode)
        this.state.mode = picoState.loadState().mode;
        console.log("After this.state.mode", this.state.mode)
        console.log('Observable state:', this.state);
        window.addEventListener('pointermove',
            this.handlePointerMove.bind(this));
    }

    initializeComponents() {
        this.navbar=new NavbarComponent('navbar', this);
        this.main= new MainComponent("main", this);
        this.footer=new FooterComponent('footer',this);

        this.picox.reaction(
            () => this.state.mode,
            () => this.navbar.update(this.state)
        );

        this.picox.reaction(
            () => this.state.curObj,
            () => this.main.outputComponent.updateObj(this.state.curObj)
        );


    }


    handleMode(mode) {
        this.setState({ ...this.state, mode: mode });
        this.main.outputComponent.stopRendering();
        switch (mode) {
            case 'output':
                this.main.outputComponent.startRendering();
                this.main.switchTo(mode);
                break;
            case 'input':
                this.main.inputComponent.update(this.state);
                this.main.switchTo(mode);
                break;
            case 'settings':
                this.main.settingsComponent.update(this.state);
                this.main.switchTo(mode);
                break;
            default:
                this.main.outputComponent.stopRendering();
                this.main.switchTo('default');
                break;
        }
    }

    setCurObj(obj){
        let updatedObjects = [
            ...this.state.objects.slice(
                Math.max(this.state.objects.length
                    - this.maxLogLines + 1, 0)),
            obj
        ];
        this.setState({ ...this.state,
             objects: updatedObjects,
             curObj: obj });
    }

    setState(newState) {
        this.debug && console.log('Setting state, old new:', this.state, newState);
        Object.assign(this.state, newState);
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
        this.setCurObj(picoObject);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });


