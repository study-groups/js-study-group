pico_build_parcel(){
    echo "Bundling picoUi with Parcel..."
    parcel build $PICO_ROOT/picoUi/picox/index.html \
        --dist-dir $PICO_ROOT/picoUi/picox/dist
        
    if [ $? -eq 0 ]; then
        echo "Bundling successful. Files are in $PICO_ROOT/picoUi/picox/dist"
    else
        echo "Bundling failed."
    fi
}

pico_build_go(){(
    echo "Building picoGo..." > /dev/stderr
    cd $PICO_ROOT/picoGo
    go build -o pico pico.go
    if [ $? -eq 0 ]; then
        echo "Executable created at $PICO_ROOT/picoGo/pico"
    else
        echo "Build failed."
    fi
)}

pico_build_picox(){(
  cd $PICO_ROOT/picoUi/picox
  local file=${1:-"./index.html"}
  [ ! -d "./css" ] && mkdir ./css
  [ ! -d "./js" ] && mkdir ./js

  _pico_generate_js > ./js/script.js
  _pico_generate_css > ./css/global.css
  pico_generate_header > $file
  pico_generate_content >> $file
  pico_generate_footer >> $file
)}
