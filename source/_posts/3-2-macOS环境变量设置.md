---
title: macOS 环境变量
date: 2025-03-01 18:28:12
tags:
  - macOS
  - Shell
  - System
categories:
  - System
---

在 macOS 系统中，可以通过以下方式来配置环境变量，查看环境变量。


## 1. 临时设置（仅对当前终端会话有效）

在终端中直接使用 `export` 命令可以设置环境变量，这个变量只在当前会话内有效。例如：

```bash
export MY_VAR="my_value"
```

之后，你可以通过 `echo $MY_VAR` 来查看变量值。如果关闭终端或启动新的终端窗口，这个设置就会失效。


## 2. 永久设置（对所有终端会话有效）

要永久设置环境变量，需要将 `export` 命令写入到 shell 的配置文件中。macOS 默认使用 zsh（macOS Catalina 及以上版本）：

- **如果你使用 zsh**，可以编辑文件 `~/.zshrc` 或 `~/.zprofile`：
  
  1. 打开终端，输入命令：
     ```bash
     nano ~/.zshrc
     ```
  2. 在文件末尾添加你需要的环境变量配置，例如：
     ```bash
     export MY_VAR="my_value"
     export PATH="$PATH:/your/custom/path"
     ```
  3. 保存并退出（在 nano 中按 `Control+O` 保存，然后 `Control+X` 退出）。
  4. 使配置立即生效：
     ```bash
     source ~/.zshrc
     ```

- **如果你使用 bash**（较旧版本或自行切换到 bash），则修改 `~/.bash_profile` 或 `~/.bashrc`：
  
  1. 打开终端，输入命令：
     ```bash
     nano ~/.bash_profile
     ```
  2. 添加环境变量配置：
     ```bash
     export MY_VAR="my_value"
     export PATH="$PATH:/your/custom/path"
     ```
  3. 保存并退出，然后运行：
     ```bash
     source ~/.bash_profile
     ```



## 3. 查看环境变量

1. **使用 printenv 命令**  
   打开终端，输入以下命令查看所有环境变量：  
   ```bash
   printenv
   ```
   这条命令会列出当前会话中的所有环境变量及其值。

2. **使用 env 命令**  
   类似于 printenv，env 命令也可以显示环境变量：  
   ```bash
   env
   ```

3. **查看特定环境变量**  
   如果只想查看某个特定的环境变量，例如 PATH，可以这样输入：  
   ```bash
   echo $PATH
   ```

4. **使用 set 命令**  
   输入以下命令也可以显示当前的所有环境变量和 shell 函数，但输出可能会更长：  
   ```bash
   set
   ```

