#!/bin/bash
# run-agent.sh - 启动 Claude Code Agent

set -e

CLUSTER_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$(dirname "$CLUSTER_DIR")"
AGENTS_DIR="$CLUSTER_DIR/agents"
LOGS_DIR="$CLUSTER_DIR/logs"
NOTIFY_SCRIPT="$CLUSTER_DIR/scripts/notify.sh"

AGENT_NAME="$1"

if [ -z "$AGENT_NAME" ]; then
    echo "Usage: $0 <agent-name>"
    exit 1
fi

AGENT_DIR="$AGENTS_DIR/$AGENT_NAME"
if [ ! -d "$AGENT_DIR" ]; then
    echo "Error: Agent '$AGENT_NAME' not found."
    exit 1
fi

TASK_FILE="$AGENT_DIR/task.md"
LOG_FILE="$LOGS_DIR/${AGENT_NAME}.log"

mkdir -p "$LOGS_DIR"

# 读取任务
TASK=$(cat "$TASK_FILE")

echo "Starting agent: $AGENT_NAME"
echo "Task: $TASK_FILE"
echo "Log: $LOG_FILE"

# 通知开始
if [ -x "$NOTIFY_SCRIPT" ]; then
    "$NOTIFY_SCRIPT" "🚀 Agent '$AGENT_NAME' 开始执行任务"
fi

# 运行 Claude Code
cd "$PROJECT_DIR"
claude --print "$TASK" 2>&1 | tee "$LOG_FILE"
EXIT_CODE=${PIPESTATUS[0]}

# 记录结束时间
echo "$(date -Iseconds)" > "$AGENT_DIR/finished-at"
echo "$EXIT_CODE" > "$AGENT_DIR/exit-code"

# 通知结束
if [ -x "$NOTIFY_SCRIPT" ]; then
    if [ $EXIT_CODE -eq 0 ]; then
        "$NOTIFY_SCRIPT" "✅ Agent '$AGENT_NAME' 任务完成"
    else
        "$NOTIFY_SCRIPT" "❌ Agent '$AGENT_NAME' 任务失败 (exit code: $EXIT_CODE)"
    fi
fi

exit $EXIT_CODE
