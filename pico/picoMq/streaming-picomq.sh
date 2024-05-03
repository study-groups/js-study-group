kill $PMQ_PID >/dev/null 2>&1
mkfifo in out 2>/dev/null
w(){ echo "$@" > in; }
r(){ m="$(<in)"; echo "$m"; }
t(){ echo "$(date +%s%6N) txt $m" > out; }
while true; do r; t; done & PMQ_IN_PID=$!;
