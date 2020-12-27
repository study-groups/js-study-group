function makeHtmlEditor(codeText="paste code here",handleChange){
	return `
<div class="editor-container">
  <div id="editor-status">idle</div>
    <textarea id="code"  
    onchange="handleEditorChange(this)">${codeText}</textarea>
</div>
`;
}

// Brutal interface, creates HTML 
function createEditorComponent(code="enter code",
	                       handleChange="handleChange")
{
    return makeHtmlEditor(code, handleChange); 
}

function handleEditorChange(evt){
    document.getElementById( "editor-status").innerText=`Got event ${evt}.`; 
    document.getElementById("content").innerHTML=
		document.getElementById("code").value;
}

function createEditorCss(){
 css=`
.editor-container{
  width:40rem;
  height:40rem;
}
.editor-textarea{
  width:100%;
  height:100%;
}

 `
}
