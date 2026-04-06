#!/bin/bash
cd "$(dirname "$0")"

# Kill any existing server on port 8080
lsof -ti:8080 | xargs -r kill 2>/dev/null

# Clean up background server on exit
cleanup() { kill "$SERVER_PID" 2>/dev/null; }
trap cleanup EXIT INT TERM

echo "Serving Living Life Study at http://localhost:8080"
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 1
xdg-open http://localhost:8080 2>/dev/null || open http://localhost:8080 2>/dev/null
wait "$SERVER_PID"
