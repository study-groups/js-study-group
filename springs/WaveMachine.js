class WaveMachine extends HTMLElement {

    pendula="notset";

    constructor() {
        super();
        this.pendula="notset-in-constructor";
        this.pendula=this.getAttribute('pendula');
        this.innerHTML += this.createInnerHtml(this.pendula);
    }

    createInnerHtml(pendula){
        return `<fieldset>
            <div class="slider slider1">
            <label for="rangeVal">freq:</label>
            <input type ="range" max="1024" min="20"
                step="1" name="rangeVal" id="rangeVal" value="200">
            </input>
            <div class="rangeDisplay"></div>
            </div> </fieldset>`
    } 

    getRange(n) { 
        return this.querySelector("fieldset")
                .children[n].children[1];
    }

   getDisplay(n) { 
        return this.querySelector("fieldset")
                .children[n].children[2];
    }

}

customElements.define('wave-machine', WaveMachine);
