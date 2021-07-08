class NomSlider extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
        this.mapToQuerySelector="notyet";
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
The "input" event is sent by a slider (i.e. input DOM element) 
that is a child of this NomSlider.

Reach down into children to grab value of the slider (1) and set 
the value display of this slider to reflect current value.
Should be via inputToValue().

Then send a custom event to the Mapper informing the mapper 
that this slider is changing. This is done by passing a custom
object as the 'detail' item. The detail item is part of the DOM
specification and is how NOM (node object model) objects are passed
between componentents.
*/
    this.addEventListener("input", (evt) => { 
        // self reflection
        this.shadowRoot.children[2].innerHTML=
        this.shadowRoot.children[1].value;

        // mapToQuerySelector was set when another slider was created.
        // This is what we want mapper to call in the mapper listener.

        document.querySelector('#nom-mapper')
           .dispatchEvent( new CustomEvent('mapper',
               { detail:
                   { id:evt.timeStamp,
                     type:"mapValueToQuerySelector",
                     data:this.value,
                     mapToQuerySelector:this.mapToQuerySelector 
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


    set id(v) {   this.setAttribute('id', v);}

//    set mapToQuerySelector(str) { 
//        this.mapToQuerySelector=str;
//    }

    get value() {
         return this.shadowRoot.children[1].value;
    }

    set label(v) {
        this.shadowRoot.children[0].innerHTML=v;
    }

}

customElements.define('nom-slider', NomSlider);
