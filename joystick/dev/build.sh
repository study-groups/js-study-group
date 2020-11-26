source ../webtool/webtool.sh

# Add a bash function with webtool- naming convention
# bash> webtool-build-test > test.html
webtool-build-test(){
  webtool-make-header;
    cat<<EOF
<script>
var ws = new WebSocket('ws://localhost:9200/');

ws.onmessage = function(event) {
  console.log('Count is: ' + event.data);
};
</script>
EOF
  webtool-make-footer;
}

