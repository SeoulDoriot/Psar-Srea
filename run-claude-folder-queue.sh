#!/bin/bash

LOG_FILE="claude-folder-queue.log"

echo "Claude folder queue started at $(date)" >> "$LOG_FILE"

TASK_DIRS=(
"claude-queue/task-1-fresh"
"claude-queue/task-2-wholesale"
"claude-queue/task-3-season"
"claude-queue/task-4-deal"
"claude-queue/task-5-farmer"
)

for DIR in "${TASK_DIRS[@]}"; do
  echo "======================================" >> "$LOG_FILE"
  echo "Waiting to run task folder: $DIR" >> "$LOG_FILE"
  echo "Started checking at $(date)" >> "$LOG_FILE"

  while true; do
    echo "Trying Claude for $DIR at $(date)" >> "$LOG_FILE"

    claude -p "
Read the task file here:
./$DIR/task.md

Use all images inside this folder as evidence:
./$DIR/images/

Complete only this task.

Rules:
- Do not work on other tasks.
- Do not change shared header/navigation/search/cart/profile/language switcher unless task.md explicitly says so.
- Do not rewrite the whole project.
- Make safe edits only.
- After finishing, summarize changed files.
- Commit this task with a clear git commit message.
" >> "$LOG_FILE" 2>&1

    if [ $? -eq 0 ]; then
      echo "Completed $DIR at $(date)" >> "$LOG_FILE"
      break
    else
      echo "Claude failed / no token / server limited. Waiting 20 minutes..." >> "$LOG_FILE"
      sleep 1200
    fi
  done

  echo "Pausing 5 minutes before next task..." >> "$LOG_FILE"
  sleep 300
done

echo "All queued Claude tasks finished at $(date)" >> "$LOG_FILE"