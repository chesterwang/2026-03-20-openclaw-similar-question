# 2026-03-20-openclaw-similar-question


项目目的： 本项目试图开发一个可以在openclaw的agent每次产生回复的时候，可以提供问题的相似问题，即问题推荐。

## 2026-03-20 18:46:51 记录

1. 完成了openclaw的hook的初步尝试，当前仅仅是记录日志成功启动。
2. 在企图实现对 agent产生的回复消息进行修改的时候，发现没有对应的sent event 并没有实现trigger，message队列也没法push来实现增加回复。
3. 所以印象上，openclaw从工程上是个极其糟糕的产品，随随便便开发一下都会碰到一堆的bug。

bug链接如下

[[Bug]: message:sent hooks not work · Issue #49765 · openclaw/openclaw](https://github.com/openclaw/openclaw/issues/49765)

[Feature: message:received hook - event.messages.push() has no effect / need agent context injection · Issue #23430 · openclaw/openclaw](https://github.com/openclaw/openclaw/issues/23430)
