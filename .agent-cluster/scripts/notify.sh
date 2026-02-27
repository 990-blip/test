#!/bin/bash
# notify.sh - 发送通知到飞书群

CLUSTER_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG_FILE="$CLUSTER_DIR/config.json"

# 读取飞书群 ID
FEISHU_CHAT_ID=$(cat "$CONFIG_FILE" | grep -o '"feishuChatId"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4)

if [ -z "$FEISHU_CHAT_ID" ]; then
    echo "Warning: feishuChatId not found in config"
    exit 0
fi

MESSAGE="$1"

if [ -z "$MESSAGE" ]; then
    echo "Usage: $0 <message>"
    exit 1
fi

# 使用 OpenClaw message 工具发送
# 这里用环境变量触发 OpenClaw 的消息发送机制
echo "FEISHU_NOTIFY:$FEISHU_CHAT_ID:$MESSAGE"
