// Hook Master - Message Logger
// Triggered on: message:received

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 日志目录 - 使用工作空间的 logs 目录
const WORKSPACE_DIR = path.join(__dirname, '..', '..', '..', '.openclaw', 'workspace');
const LOGS_DIR = path.join(WORKSPACE_DIR, 'logs');

// 确保日志目录存在
function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

// 获取今天的日志文件路径
function getTodayLogFile() {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return path.join(LOGS_DIR, `messages-${date}.jsonl`);
}

// 记录消息到日志
function logMessage(event) {
  ensureLogsDir();
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    sessionKey: event.sessionKey || null,
    channel: event.context?.channel || null,
    provider: event.context?.provider || null,
    content: event.context?.content || '',
    metadata: {
      type: event.type,
      action: event.action
    }
  };
  
  const logFile = getTodayLogFile();
  const logLine = event.action +"      "+ JSON.stringify(logEntry) + '\n';
  const logLine2 = event.action +"      "+JSON.stringify(event) + '\n';
  
  try {
    fs.appendFileSync(logFile, "-------------------------", 'utf8');
    // fs.appendFileSync(logFile, logLine, 'utf8');
    fs.appendFileSync(logFile, logLine2, 'utf8');
    console.log(`[hook-master] Message logged to ${logFile}`);
  } catch (err) {
    console.error(`[hook-master] Failed to write log: ${err.message}`);
  }
  event.messages.push("✨ hook-master 工作完成如何?");
}

// Hook 入口函数
export default async function handler(event) {
  // 验证事件上下文
  // if (event.type !== 'message' || (event.action !== 'received' && event.action !== 'sent' && event.action !== 'preprocessed') ) {
  if (event.type !== 'message'  ) {
    return;
  }

  // 记录消息
  logMessage(event);
}
