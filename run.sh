#!/usr/bin/env bash

docker start pg >/dev/null 2>&1

tmux new-session -d -s cloudos

# Left pane: backend
tmux send-keys -t cloudos "cd ~/web-dev/cloudOs/backend && bun start" C-m

# Right pane: frontend
tmux split-window -h -t cloudos
tmux send-keys -t cloudos:0.1 "cd ~/web-dev/cloudOs/frontend && bun start --host" C-m

# Optional: make panes equal size
tmux select-layout -t cloudos even-horizontal

# cdoe . 
code ~/web-dev/cloudOs/. &
# Attach
tmux attach -t cloudos


