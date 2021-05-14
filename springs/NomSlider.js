class NomSlider extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
        this.init();
    }

    connectedCallback(){
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


/* 
Reach down into children to grab value of the slider (1) and set 
the value display of this slider, should be via inputToValue().

Then send a custom event to the Mapper informing the mapper 
that this slider is changing. This is done by passing a custom
object as the 'detail' item. The detail item is part of the DOM
specification and is how NOM (node object model) objets are passed
between componentents.
*/    
     this.addEventListener("input", (evt) => { 
            // self reflection
            this.shadowRoot.children[2].innerHTML=
            this.shadowRoot.children[1].value;

            // this was set when the slider was created.
            let qs=`.${this.shadowRoot.className}`;

            document.querySelector('#mapper')
               .dispatchEvent( new CustomEvent('mapper',
                              { detail:
                                  { id:evt.timeStamp,
                                    type:"mapValueToQuerySelector",
                                    data:this.value,
                                    querySelector:qs
                                  }
                               }));
        });                                                                       
        this.shadowRoot.appendChild(label);  // children[0]
        this.shadowRoot.appendChild(input);  // children[1]
        this.shadowRoot.appendChild(val);    // children[2]

        this.addEventListener( "slider.set", function() {
            this.shadowRoot[1].value=evt.detail.value;
        });
    }

    set value(v) { this.shadowRoot.children[2].innerHTML=v };


    get value() {
         return this.shadowRoot.children[1].value;
    }

    set label(v) {
        this.shadowRoot.children[0].innerHTML=v;
    }

}

customElements.define('nom-slider', NomSlider);
