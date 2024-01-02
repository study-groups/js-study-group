#!/bin/bash

pico_build(){
  local file=${1:-"./index.html"}

  [ ! -d "./css" ] && mkdir ./css
  [ ! -d "./js" ] && mkdir ./js

  _pico_generate_js > ./js/script.js
  _pico_generate_css > ./css/global.css
  pico_generate_header > $file
  pico_generate_content >> $file
  pico_generate_footer >> $file 
}

pico_generate_header() {
    cat <<EOF
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PicoMVC</title>
<!-- <link rel="stylesheet" href="./css/pico.min.css"> -->
<link rel="stylesheet"
   href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
<link rel="stylesheet" href="./css/global.css">
<script src="./js/script.js"></script>
</head>
EOF
}

# Function to generate content
pico_generate_content() {
    local main="$(pico_generate_main)"
    cat <<EOF
    <main class="container">
    $main
    </main>
EOF
}
pico_generate_main(){
    cat <<EOF
        <div class="top-section">
            <h4>Configure, run and monitor jobs at scale from AI assisted
            Jupyter notebooks. See<a href="https://notes.nodeholder.com">
            Nodeholder Notes</a> to learn more.</h4>
        </div>
        <div class="middle-section">
            <button
                class="button-primary"
                onclick="toggleDarkMode()"
            >
                Toggle Dark Mode
            </button>
        </div>

        <div class="bottom-section">
            <p></p>
        </div>
EOF
}

pico_generate_components(){
   for component in $(ls -1 components/*.env)                                   
   do                                                                           
      local basename=$(basename $component)                                     
      cat $component | envsubst
   done                                                                         
}

# Function to generate footer
pico_generate_footer() {
    cat <<EOF
<footer>
    <!-- You can place your footer content here -->
</footer>
</html>
EOF
}

# Function to generate full page
pico_generate_page() {
    pico_generate_header
    pico_generate_content
    pico_generate_footer
}

#!/bin/bash


_pico_generate_css() {
    cat <<EOF
/* CSS variables for colors */
:root {
    --background-color: #f0f0f0;
    --foreground-color: #333;
    --accent-color: #007bff;
}

/* Body styling using CSS variables */
body {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: var(--background-color);
    color: var(--foreground-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

/* Button styling using CSS variables */
button {
    background: var(--foreground-color);
    color: var(--background-color);
    padding: 10px 20px;
    margin-top: 20px;
}

/* Dark mode styling */
body.dark-mode {
    background: var(--foreground-color);
    color: var(--background-color);
}

/* Dark mode button styling */
body.dark-mode button {
    background: var(--background-color);
    color: var(--foreground-color);
}

/* Top, middle and bottom section styling */
.top-section, .middle-section, .bottom-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}
EOF
}

# Function to generate JS
_pico_generate_js() {
    cat <<'EOF'
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check the user's preference on page load
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
EOF
}



