class App {
    constructor() {
        this.picox = new PicoX();
        this.maxLogLines=10;
        this.loggingReactionId=0;
        this.state = this.picox.observable({
            mode: 'default',
            objects: [],
        });

        themeSwitcher.init();
        this.initializeComponents();

        this.handleMode(picoState.loadState().mode);

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

    handleLogging(loggingEnabled=false){
        this.setState({ ...this.state, loggingEnabled: loggingEnabled });
        if(loggingEnabled){
            console.log("handleLogging: loggingOn", this.loggingReactionId)
            this.loggingReactionId = this.picox.reaction(
                () => this.state.curObj,
                () => this.footer.update(this.state)
            );
         }
         else{
            console.log("handleLogging: loggingOFF", this.loggingReactionId);
            this.picox.removeReaction(this.loggingReactionId);
            this.footer.update({objects:[]});
         }

     }

      handleLoadTechnoStylesheet() {
        if (!document.getElementById('technoStylesheet')) {
            const link = document.createElement('link');
            link.id = 'technoStylesheet';
            link.rel = 'stylesheet';
            link.href = './techno.css'; // Replace with the actual path
            document.head.appendChild(link);
        }
    }

    handleMode(mode) {
        this.setState({ ...this.state, mode: mode });
        picoState.saveState(this.state);
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
                this.main.settingsComponent.init(this.state);
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
        picoDebug && console.log('Setting state, old new:', this.state, newState);
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


