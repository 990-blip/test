#!/bin/bash
# spawn-agent.sh - 派生 Claude Code Agent

set -e

CLUSTER_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$(dirname "$CLUSTER_DIR")"
CONFIG_FILE="$CLUSTER_DIR/config.json"
AGENTS_DIR="$CLUSTER_DIR/agents"

# 读取配置
AGENT_NAME="${1:-agent-$(date +%s)}"
TASK_FILE="$2"

if [ -z "$TASK_FILE" ] || [ ! -f "$TASK_FILE" ]; then
    echo "Usage: $0 <agent-name> <task-file>"
    echo "Example: $0 feature-weight-chart prompts/add-weight-chart.md"
    exit 1
fi

# 创建 agent 目录
AGENT_DIR="$AGENTS_DIR/$AGENT_NAME"
mkdir -p "$AGENT_DIR"

# 复制任务文件
cp "$TASK_FILE" "$AGENT_DIR/task.md"

# 记录启动时间
echo "$(date -Iseconds)" > "$AGENT_DIR/started-at"

echo "Agent '$AGENT_NAME' spawned."
echo "Task: $TASK_FILE"
echo "Dir: $AGENT_DIR"
echo ""
echo "Next: Run ./scripts/run-agent.sh $AGENT_NAME"
