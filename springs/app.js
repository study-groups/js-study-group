window.addEventListener('load', () => {
    // wavemachine is collection of oscilators with silders
    const wavemachine = document.getElementById("wave-machine");

    slider = document.createElement('nom-slider');
    slider.label="wm1";
    slider.id="wm1";
    wavemachine.shadowRoot.appendChild(slider);
    slider = document.createElement('nom-slider');
    wavemachine.shadowRoot.appendChild(slider);

    controller = document.querySelector("#controller");
    slider = document.createElement('nom-slider');
    slider.mapToQueryString="wm1";
    controller.appendChild(slider);
})

/* Notes:
    function updatePendulum(evt){
       wavemachine.getRange(0).value=1024*evt.target.value;
       wavemachine.getRange(0).dispatchEvent(new Event('input'));
    }
    // delete all children
    while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
    }
*/
