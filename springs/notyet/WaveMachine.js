class WaveMachine extends HTMLElement {

    pendula="notset";

    constructor() {
        super();
        this.attachShadow({mode: 'open'});                                      
    }

    connectedCalleback() {
        init();
    }

    init(){
        slider = document.createElement('nom-slider');
        slider.className="slider-1";
        slider.value=.5;
        slider.label="slider1";
        //this.shadowRoot.appendChild(slider);
    }
/*
    createInnerHtml(pendula){
        return `<fieldset>
            <div class="slider">
            <label for="rangeVal">freq:</label>
            <input type ="range" max="1024" min="20"
                step="1" name="rangeVal" id="101" value="200">
            </input>
            <div class="rangeDisplay"></div>
            </div> </fieldset>`
    } 
*/
}

customElements.define('wave-machine', WaveMachine);
