window.addEventListener('load', () => {
    // wavemachine is collection of silders
    const wavemachine = document.getElementById("wave-machine");

    controller = document.querySelector("#controller");
    slider = document.createElement('control-slider');

//    while (controller.firstChild) {
//       controller.removeChild(controller.firstChild);
//    }

    controller.appendChild(slider);
    slider = document.createElement('control-slider');

    function updatePendulum(evt){
       wavemachine.getRange(0).value=1024*evt.target.value;
       wavemachine.getRange(0).dispatchEvent(new Event('input'));
    }
})
