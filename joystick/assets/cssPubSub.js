function CssPubSub(){
    subs=[];
    return {
        subscribe:function(el,prop){
            subs[el]=prop;
        },
        publish:function(){
            alert(`publish ${subs[0]}`);
	}
    }
}
cssPubSub=CssPubSub();
