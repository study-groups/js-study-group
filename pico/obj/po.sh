source index.sh
createIndexHtml

mkdir -p ./js
source create.sh
createPicoObjectJs
createReactiveFrameworkJs
createMainJs

mkdir -p ./css
source css.sh
createGlobalCss

source list.sh
echo "All files created. Run 'index.html' in your browser."

po-clean(){
  rm -rf css
  rm -rf js
  rm index.html
}
