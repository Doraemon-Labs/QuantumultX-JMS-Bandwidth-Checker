# 适用于 QuantumultX 的 Just My Socks 网络流量监控脚本

这个脚本提供了一种方便的方法来监控你的Just My Socks服务的带宽使用情况。它可以直接在Quantumult X上运行，无论是作为策略组的一部分，还是作为独立脚本运行。

## 功能特性

- 实时获取月度带宽限额和已使用带宽
- 显示剩余带宽和使用比例
- 适用于Quantumult X的节点菜单或独立运行模式
- 直观展示带宽使用情况，帮助避免超出限制

## 如何使用

1. **获取你的Just My Socks API URL**：
   - 登录到Just My Socks官网，找到“API – Bandwidth Counter”部分。
   - 复制你的个人API URL。

2. **配置脚本**：
   - 将复制的API URL粘贴到脚本中`var api_url = "XXXXXX";`的`"XXXXXX"`处。

3. **在Quantumult X中添加脚本**：
   - 将编辑好的脚本添加到Quantumult X的相关配置部分。

4. **运行脚本**：
   - 你可以通过Quantumult X的策略组选择此脚本运行，或者直接在Quantumult X中运行此脚本。

5. **查看带宽使用情况**：
   - 根据脚本运行的模式，你将在Quantumult X的日志中或通过弹出的HTML消息查看到你的带宽使用情况。

## 安全提示

请确保不要公开或分享你的Just My Socks API URL，它包含了敏感信息。如果你认为API URL已经泄露，请立即更改你的Just My Socks服务密码以重置你的UUID。

## 版权信息

此脚本根据MIT License发布。欢迎贡献代码和反馈意见。
