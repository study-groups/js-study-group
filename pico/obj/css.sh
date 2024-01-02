createGlobalCss() {
cat <<EOF > ./css/global.css
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #0d0d0d;
    color: white;
}
#container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
header {
    background-color: #333;
    text-align: center;
    padding: 10px 0;
}
.header-item {
    display: inline-block;
    width: 30%;
    text-align: center;
}
#app {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
}
.counter {
    border: 1px solid #333;
    background-color: #222;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
}
.count {
    flex-grow: 1;
    text-align: center;
}
footer {
    background-color: #333;
    text-align: center;
    padding: 10px 0;
    position: sticky;
    bottom: 0;
}
@media (max-width: 600px) {
    .footer-button {
        padding: 15px;
        font-size: 1em;
    }
}
EOF
}

