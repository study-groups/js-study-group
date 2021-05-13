class Slider extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
    }

    connectedCallback(){
        this.init();
    }
   
    init() {
        const input = document.createElement('INPUT');
        input.type = 'range';
        input.value = .5;
        input.min =0;
        input.max = 1;
        input.step = .01;
             
        let label=document.createElement('label')
        label.innerHTML="lfo";
        label.className="label";

        let val=document.createElement('span')
        val.innerHTML="0 Hz";
        val.className="rangeDisplay";

        this.addEventListener("input", (evt) => { 
            this.shadowRoot.children[2].innerHTML=
            this.shadowRoot.children[1].value;

            document.querySelector('#mapper')
               .dispatchEvent( new CustomEvent('mapper',
                               {detail:this.value}) );
        });                                                                       
        this.shadowRoot.appendChild(label);
        this.shadowRoot.appendChild(input);
        this.shadowRoot.appendChild(val);
    }
    
    set value(v) {
        this.shadowRoot.children[2].innerHTML=v;
    }

    get value() {
         return this.shadowRoot.children[1].value;
    }

}

customElements.define('control-slider', Slider);
