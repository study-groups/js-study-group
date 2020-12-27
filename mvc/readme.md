# Single Buffer App

## About
A single buffer app contains the entire app in one contiguous buffer. This file shows the progression of a 
model-view-controller framework for vanilla JavaScript. This example begins by defining a stateless
controller-view pair using onchange as the controller and li as a view element.

Each line can be cut and paste into the URL of browser using 
[data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).


```
data:text/html, <html><input></input><li>idle</li></html>

data:text/html, <html><input onchange='document.getElementById("li").innerText=document.getElementById("in");'></input><li id="li">idle</li></html>

data:text/html, <html><input id="in" onchange='document.getElementById("li").innerText=document.getElementById("in");'></input><li id="li">idle</li></html>

data:text/html, <html><input id="in" onchange='d=document; d.g=getElementById; d.g("li").innerText=d.g("in");'></input><li id="li">idle</li></html>

data:text/html,<input id="in" onchange='d=document; d.g=getElementById; d.g("li").innerText=d.g("in");'></input><li id="li">idle</li>

data:text/html,<input id="in" onchange='d=document; d.g=getElementById; d.g("li").innerText=d.g("in").value;'></input><li id="li">idle</li>

// Begining MVC where uV(p) is short for updateView(props)
data:text/html,<input id="in" onchange='d=document; function uV(p){d.g=getElementById; d.g("li").innerText=d.g("in").value;} uV();'></input><li id="li">idle</li>

// Passing prop to view
data:text/html,<input id="in" onchange='d=document; d.g=getElementById; function uV(p){ d.g("li").innerText=p;} uV(d.g("in").value);'></input><li id="li">idle</li>

// Add business logic in model. Could do this in handler/controller
data:text/html, <input id="in" onchange='d=document; d.g=getElementById;function uV(p){ d.g("li").innerText=p;} function uM(v){ biz(v); uV(v);} function biz(v){return v;} v=biz(d.g("in").value); uM(v);'></input><li id="li">idle</li>

// biz in controller before model update:
data:text/html, <input id="in" onchange='d=document; d.g=getElementById;function uV(p){ d.g("li").innerText=p;} function uM(v){uV(v);} function biz(v){return v;} v=biz(d.g("in").value); uM(biz(v));'></input><li id="li">idle</li>

// baby step adding model state, view updates with ojbect ref
data:text/html, <input id="in" onchange='m={}; d=document; d.g=getElementById;function uV(p){ d.g("li").innerText=p;} function uM(v){uV(v);} function biz(v){m.m=v; return m;} v=biz(d.g("in").value); uM(biz(v));'></input><li id="li">idle</li>

// biz(v): val = businessLogic(value)
// uM(v):  updateModel(val), assume s.m=val, calls updateView(s)
// uV(str):  updateView(str) 
data:text/html, <input id="in" onchange='s={}; d=document; d.g=getElementById;function uV(str){ d.g("li").innerText=str;} function uM(v){s.m=v; uV(v);} function biz(v){return v.toLowerCase();} str=biz(d.g("in").value); uM(str);'></input><li id="li">idle</li>


// biz(v): kv = business-logic(value); returns keyval array of 2 elements
// uM(kv): updateModel(kv), stores in global gKv
// uV(kv):  updateView(kv), state gets passed as props
data:text/html, <input id="in" onchange='s={}; d=document; d.g=getElementById;function uV(kv){ d.g("li").innerText=kv[1];} function uM(kv){gKv=kv; uV(kv);} function biz(v){kv=v.split("="); return kv;} kv=biz(d.g("in").value);gKv=["m",3]; uM(kv);'></input><li id="li">idle</li>


// biz(v): kv = business-logic(kv_str), if invalid, return gKv
// uM(kv): updateModel(kv), stores in global gKv
// uV(kv):  updateView(kv), state gets passed as props
data:text/html, <input id="in" onchange='s={}; d=document; d.g=getElementById;function uV(kv){ d.g("li").innerText=kv[1];} function uM(kv){gKv=kv; uV(kv);} function biz(v){kv=v.split("="); return (kv[1] ? kv : gKv);} kv=biz(d.g("in").value);gKv=["m",3]; uM(kv);'></input><li id="li">try k=3</li>


// change uM(kv) to uM(k,v)
data:text/html, <input id="in" onchange='s={}; d=document; d.g=getElementById;function uV(kvs){ d.g("li").innerText=JSON.stringify(kvs);} function uM(k,v){gKvs[k]=v; uV(gKvs);} function biz(v){kv=v.split("="); return kv;} gKvs={}; kv=biz(d.g("in").value); uM(kv[0],kv[1]);'></input><li id="li">try k=3 or m=3</li>


// moved model out of controller (all code is in input handler!) 
data:text/html, <input id="in" onchange='s={}; d=document; d.g=getElementById;function uV(kvs){ d.g("li").innerText=JSON.stringify(kvs);} function uM(k,v){gKvs[k]=v; uV(gKvs);} function biz(v){kv=v.split("="); return kv;} kv=biz(d.g("in").value); uM(kv[0],kv[1]);'></input><li id="li">try k=3 or m=3</li><script>gKvs={};</script>

// change input to textarea
data:text/html, <textarea id="in" onchange='s={}; d=document; d.g=getElementById;function uV(kvs){ d.g("li").innerText=JSON.stringify(kvs);} function uM(k,v){gKvs[k]=v; uV(gKvs);} function biz(v){kv=v.split("="); return kv;} kv=biz(d.g("in").value); uM(kv[0],kv[1]);'></textarea><li id="li">try k=3 or m=3</li><script>gKvs={};</script>

```

## Expanded single line MVC

1. VIEW: `<li>`, `updateView()`
2. CONTROLLER: `in.onchange()` `businessLogic()`
3. MODEL: `globalKeyValuesObject` `updateModel()`
```
data:text/html,
<textarea id="in"
onchange='
  s={};
  d=document;
  d.g=getElementById;
  function uV(kvs){
    d.g("li").innerText=JSON.stringify(kvs);
  }
  function uM(k,v){
    gKvs[k]=v; uV(gKvs);
  }
  function biz(v){
    kv=v.split("="); 
    return kv;
  } 
  kv=biz(d.g("in").value);
  uM(kv[0],kv[1]);'
></textarea>
<li id="li">try k=3 or m=3</li>
<script>
gKvs={};
</script>
```

## MVC with simple graphing matrix 

- [001](./ver/index-001.html)
- [002](./ver/index-002.html)
- [003](./ver/index-003.html)
- [004](./ver/index-004.html)
- [005](./ver/index-005.html)
- [006](./ver/index-006.html)
- [007](./ver/index-007.html)
- [008](./ver/index-008.html)
- [009](./ver/index-009.html)
- [010](./ver/index-010.html)
- [011](./ver/index-011.html)
- [012](./ver/index-012.html)
