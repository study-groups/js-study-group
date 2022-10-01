class NomMapper extends HTMLElement {
    constructor() {
        super();

        this.input={};
        this.output={};
        this.attachShadow({mode: 'open'}); 

        this.addEventListener('mapper', (evt) => {
            this.input={...evt.detail};
            this.render(this.input,this.output);
        });

        this.addEventListener("mapper", function (evt) {
            let qs=evt.detail.mapToQuerySelector;
            let root = document.querySelector("nom-slider").shadowRoot; 
            let obj=root.querySelector(evt.detail.mapToQuerySelector);
            let mappedVal =evt.detail.value;
            let sendDetail =    { id: evt.timeStamp, 
                                 type:"slider.set",
                                data:mappedVal};

            this.output=sendDetail; 
            this.render(this.input,this.output);
            obj.dispatchEvent( new CustomEvent('slider.set',
                                {detail:sendDetail}));
        });
     }

    connectedCallback(){
         this.render();
    }

    render(inDetail,outDetail) {
         //this.shadowRoot.innerHTML ="<h3>Mapper</h3>";
         this.shadowRoot.innerHTML ="Mapper\n\n";
         this.shadowRoot.innerHTML +=
             `detailIn: ${JSON.stringify(inDetail,null,4)}\n\n`;
         this.shadowRoot.innerHTML +=
              `detailOut: ${JSON.stringify(outDetail,null,4)}`;
    }
}

function stringifyEvent(e) {
  const obj = {};
  for (let k in e) {
    obj[k] = e[k];
  }
  return JSON.stringify(obj, (k, v) => {
    if (v instanceof Node) return 'Node';
    if (v instanceof Window) return 'Window';
    return v;
  }, 4);
}

customElements.define('nom-mapper', NomMapper);
