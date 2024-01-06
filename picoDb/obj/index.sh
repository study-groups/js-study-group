# BGF for index.html
createIndexHtml() {
cat <<EOF > ./index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PicoUI</title>
    <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css">
    <link rel="stylesheet" href="./css/global.css">
</head>
<body class="sans-serif">
    <div id="container">
        <header>
            <div class="header-item">R</div>
            <div class="header-item">PicoUI</div>
            <div class="header-item">L</div>
        </header>
        <div id="app">
            <!-- Counters will be added here -->
        </div>
        <footer>
            <button id="addCounter" class="footer-button f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib white bg-dark-green">Add Counter</button>
            <button id="deleteCounter" class="footer-button f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib white bg-dark-red">Delete</button>
            <button id="undoAction" class="footer-button f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib white bg-dark-blue">Undo</button>
        </footer>
    </div>
    <script src="./js/PicoObject.js"></script>
    <script src="./js/PicoList.js"></script>
    <script src="./js/PicoElement.js"></script>
    <script src="./js/ReactiveFramework.js"></script>
    <script src="./js/main.js"></script>
</body>
</html>
EOF
}
