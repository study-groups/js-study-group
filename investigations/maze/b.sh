export MAZE_CSS=$(cat maze.css)
export MAZE_JS=$(cat maze.js)
export MAZE_JS=""
envsubst < index.env
