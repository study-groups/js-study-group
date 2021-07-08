window.addEventListener('load', () => {
    // wavemachine is collection of oscilators with silders
    const wavemachine = document.getElementById("wave-machine");

    slider = document.createElement('nom-slider');
    slider.label="wm1";
    slider.id="wm1";
    slider.shadowRoot.id="wm1";
    wavemachine.shadowRoot.appendChild(slider);
    //slider = document.createElement('nom-slider');
    //wavemachine.shadowRoot.appendChild(slider);

    controller = document.querySelector("#controller");
    slider = document.createElement('nom-slider');
    slider.mapToQuerySelector="#wm1";
    removeChildren(controller);
    controller.appendChild(slider);
})

// delete all children
removeChildren = (parent) => {
    while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
    }
}
/* Notes:
    function updatePendulum(evt){
       wavemachine.getRange(0).value=1024*evt.target.value;
       wavemachine.getRange(0).dispatchEvent(new Event('input'));
    }
*/
