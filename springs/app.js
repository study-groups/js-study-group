(function () { 
springs=Springs();
var wavemachine = document.querySelector(".wavemachine-1");

wavemachine.getRange = function (n) { 
    return wavemachine.querySelector("fieldset")
            .children[n].children[1];
}

wavemachine.getDisplay = function (n) { 
    return wavemachine.querySelector("fieldset")
            .children[n].children[2];
}


controller = document.querySelector(".controller-1");
controller.get = function (n){ return controller.children[n]; }

slider = document.createElement('div');
slider.className = "slider control-1"
slider.dataset.val = "20"

input = document.createElement('input');
input.type = 'range';
input.min = 0.0;
input.max = 1;
input.step = .001;

let label=document.createElement('label')
let val=document.createElement('div')
label.innerHTML="lfo";
label.className="label";
val.innerHTML="0 Hz";
val.className="rangeDisplay";

slider.appendChild(label);
slider.appendChild(input);
slider.appendChild(val);
controller.appendChild(slider);

slider.children[1].value = 0.8;
slider.children[1].addEventListener("input", function (evt) {
  controller.get(0).children[2].innerHTML=evt.target.value; 
  updatePendulum(evt);
  ;
});

wavemachine.getRange(0).addEventListener("input",function(evt){
    wavemachine.getDisplay(0).innerHTML=evt.target.value;
});

function updatePendulum(evt){
   wavemachine.getRange(0).value=1024*evt.target.value;
   wavemachine.getRange(0).dispatchEvent(new Event('input'));
}

springs.init();
})();
