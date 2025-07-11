---
title: MacOS-M2 如何进入恢复模式管理SIP
date: 2025-02-17 11:44:53
tags:
   - macOS
   - M2
   - SIP
   - System-security
   - System 
categories:
  - System
---


在 macOS M2 设备上，有时我们需要进入 **恢复模式**（Recovery Mode）来执行一些系统级的操作，比如关闭或开启 SIP（System Integrity Protection）。本文将详细介绍如何进入恢复模式，并管理 SIP 设置。

## 进入恢复模式
1. **关闭 Mac**：如果 Mac 处于开机状态，先正常关机。
2. **进入恢复模式**：按住 **电源键**，直到看到 Apple 标志和"启动选项"的窗口。
3. **选择恢复模式**：在启动选项中，点击 **选项（Options）**，然后选择 **继续（Continue）**。
4. **打开终端**：
   - 在恢复模式界面，点击 **左上角菜单**。
   - 选择 **Utilities（实用工具）** > **Terminal（终端）**。

## 关闭 SIP
1. 在终端中输入以下命令：
   ```sh
   csrutil disable
   ```
2. 按下 **回车（Enter）**。
3. 根据提示输入 **管理员密码**（不会显示输入内容，直接输入后按回车）。
4. 关闭 **终端**。
5. 点击 **左上角苹果图标**，选择 **Restart（重启）**，等待 Mac 重新启动。
6. 现在，SIP 已被关闭，你可以运行需要操作的文件。

## 重新开启 SIP
完成所需操作后，建议重新启用 SIP 以保护系统安全。步骤如下：

1. **重复进入恢复模式**（参考上方步骤）。
2. **打开终端**，输入以下命令：
   ```sh
   csrutil enable
   ```
3. 按下 **回车（Enter）**。
4. 关闭 **终端**。
5. 点击 **左上角苹果图标**，选择 **Restart（重启）**，等待 Mac 重新启动。
6. 现在，SIP 已成功启用，系统受保护状态恢复。

## 结语
SIP 是 macOS 的一项重要安全机制，通常情况下不建议关闭。只有在需要进行特定修改时才临时关闭，并在操作完成后立即重新启用，以确保系统安全稳定。

