---
name: hook-master
description: '记录所有接收到的消息到 JSONL 日志文件'
metadata:
  openclaw:
    emoji: '📝'
    events: ['message']
---

# Hook Master

记录所有接收到的消息到 logs 目录的 JSONL 日志文件中。
记录内容包括：时间戳、消息内容、会话信息。
