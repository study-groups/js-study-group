class ValueMapper extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
        this.addEventListener('mapper', (evt) => {
             this.shadowRoot.innerHTML=`Event value: ${stringifyEvent(evt)}`
        });
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

customElements.define('value-mapper', ValueMapper);
