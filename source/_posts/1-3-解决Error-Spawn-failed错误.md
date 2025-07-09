---
title: 3.成功解决Error:Spawn failed错误
date: 2025-01-15 04:57:15
categories:
  - Hexo
tags:
  - GitHub
  - Hexo
  - Error
  - Git
  - Homebrew
  - deploy
---


在使用 Hexo 框架将博客部署到 GitHub 时，总是遇到了 `Error: Spawn failed` 错误，具体错误信息如下：

```bash
Error: Spawn failed
    at ChildProcess.<anonymous> (/Users/<Username>/hexo-blog/node_modules/hexo-deployer-git/node_modules/hexo-util/lib/spawn.js:51:21)
    at ChildProcess.emit (node:events:524:28)
    at ChildProcess._handle.onexit (node:internal/child_process:293:12)
```
通过查看 Hexo 官方文档发现，或许是 `Git` 包不完整导致的 `Error: Spawn failed` 错误。在检查 macOS系统 后发现自带一个不完整版 Git ，需要通过 `Homebrew` 来安装 Git 最新版本。

所以本文将介绍安装配置 `Homebrew` 和 `Git`，最终解决这个问题。同时推荐更换 `Token`，使用 `SSH` 来部署项目，下一篇文章介绍如何更换和配置 `SSH` ，做到丝滑部署项目不卡顿。


---

### 1. 参考 Hexo 官方文档：

首先，我查阅了 [Hexo 官方文档](https://hexo.io/docs/) **再次确认**安装和部署的相关步骤。发现我并没有安装[Homebrew](https://brew.sh/)。


### 2. 检查 Homebrew 和 Git

根据错误提示，问题可能与 Git 的配置有关。通过查看系统环境，发现我的 MacBook Air M2 使用的是 Apple 自带的 Git，而不是通过 Homebrew 安装的版本。这可能导致了 `hexo-deployer-git` 插件无法正确调用 Git。


### 3. 在 macOS 安装 Homebrew

#### 官网安装

访问 [Homebrew 官网](https://brew.sh/)，获取最新的安装命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

复制并粘贴到终端中执行，Homebrew 将自动下载并安装。

#### 大陆镜像源安装

由于某些地区（如中国大陆）访问 GitHub 时可能会受到限制，导致安装 Homebrew 或通过 Homebrew 下载软件包时速度缓慢或失败。可以使用清华大学提供的 Homebrew 的镜像源来解决这个问题。通过先设置镜像源，然后安装 Homebrew。

- 设置 Homebrew 使用清华镜像：
	``` bash
	/bin/bash -c "$(curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.sh)"
	```

#### 测试是否安装成功
```bash
brew --version
```

#### 如果需更新版本
```bash
brew update
```

- 如果更新时发现以下错误：
	```bash
	(base) artin@Artins-MacBook-Air homebrew % brew update
	
	Error: /opt/homebrew is not writable. You should change the
	ownership and permissions of /opt/homebrew back to your
	user account:
	sudo chown -R artin /opt/homebrew
	```

- 这个错误表明 `/opt/homebrew` 目录的所有权不属于当前用户 `artin`，导致无法进行更新。你可以按照提示的步骤，使用 `chown` 命令更改该目录的所有权。具体操作如下：
	```bash
	sudo chown -R artin /opt/homebrew
	```
再次尝试`brew update`即可。

### 4. 安装 Git

#### 检查 git 仓库
- 成功安装Homebrew检查git仓库是否完整：
```bash
cd /opt/homebrew
git status
```
- 或许会出现下面错误：
	```bash
	fatal: detected dubious ownership in repository at '/opt/homebrew'
	To add an exception for this directory, call:
	git config --global --add safe.directory /opt/homebrew
	```
	这个错误是因为 Git 检测到 `/opt/homebrew` 目录的所有权不匹配或不安全（通常发生在文件系统上的权限问题）。Git 出于安全原因默认会阻止不安全的目录操作，你可以通过添加目录为"安全"目录来解决这个问题。
	运行以下命令来将 `/opt/homebrew` 目录添加为 Git 的安全目录：
		```bash
		git config --global --add safe.directory /opt/homebrew
		```

	然后，重新运行 `git status` 来检查仓库的状态，你可能会看到如下内容：
	```bash
	(base) artin@Artins-MacBook-Air homebrew % git status
	
	On branch main
	Your branch is up to date with 'origin/main'.
	
	nothing to commit, working tree clean
   ```

#### 安装 Git

- 通过 Homebrew 安装 Git：

   ```bash
   brew install git
   ```
   这会安装最新的 Git 版本，并确保你在 Hexo 部署过程中使用的是更新版本的 Git。

- 检查git的系统路径
	确保 Homebrew 的路径正确，并且 git 能够从终端找到。你可以检查 git 是否已正确安装在 PATH 中：
	```bash
	which git
	```

	此时我发现有两个git，一个是Apple的MacBookAir自带的，另一个是Homebrew下载的。首先确认 Git 是否通过 Homebrew 安装，运行以下命令：
	```bash
	brew list git
	```
	- 如果结果为空，说明 Git 不是通过 Homebrew 安装的。
	- 如果返回路径，说明 Git 是通过 Homebrew 安装的。

	- 如果发现以下错误：
		```bash
		(base) artin@Artins-MacBook-Air ~ % brew list git
		Error: No such keg: /opt/homebrew/Cellar/git
		```
	首先，确保 Homebrew 安装的 Git 是在 `/opt/homebrew/bin/git` 路径下。你可以使用以下命令检查 Homebrew Git 的安装路径：
	```bash
	which -a git
	```
	
- 将 Git 添加到环境变量
	这将列出所有 Git 可执行文件的路径。如果你看到 `/opt/homebrew/bin/git` 路径，那么我们就可以将其优先加载。
	需要修改你的 PATH 环境变量。编辑你的 ~/.zshrc 配置文件（如果你使用的是 Zsh shell）：
	```bash
	nano ~/.zshrc
	```
	在文件末尾添加以下内容：
	```bash
	export PATH="/opt/homebrew/bin:$PATH"
	```
	如果你使用 `nano`，按 `Ctrl + X`，然后按 `Y` 确认保存，最后按 `Enter` 退出.
	重新加载配置文件：
	```bash
	source ~/.zshrc  # 如果你使用 zsh
	```
- 验证Git
	```BASH
	which git
	git --version
	```
	你应该看到 `/opt/homebrew/bin/git` 路径下有git版本号出现。



现在应该可以成功通过以下代码部署项目到GitHub上：
```bash
hexo clean
hexo g
hexo d
```

如果还有链接还是有问题，可以试着将本地文件备份，并删除 Github 所以内容，删除 Token, 从 Token 更换为SSH认证的方式，提升连接和部署效率。详细教程在下一章，手把手教程。



### 经验总结：

- **Hexo 部署的关键点：** 确保 Git 配置正确，尤其是在使用 GitHub 部署时，建议使用 SSH 而非 HTTPS。为此，需要生成并配置 SSH 密钥。
- **使用 Homebrew 安装 Git：** macOS 默认的 Git 版本可能存在兼容性问题，因此建议通过 Homebrew 安装和管理 Git 版本。
- **GitHub 配置：** 如果遇到与 GitHub 连接的问题，首先检查 SSH 配置，并确保 SSH 密钥已正确添加到 GitHub 中。
- **错误调试：** 在遇到部署错误时，仔细查看错误信息，通常能够提供解决问题的线索，比如此处的 `Spawn failed` 错误，提示 Git 配置问题。

如果在部署过程中遇到类似问题，可以参考此解决流程来排查和修复。



