---
title: 2.SSH 连接 GitHub：告别 Token
date: 2025-01-14 05:49:44
categories:
  - Hexo
tags:
  - GitHub
  - Hexo
  - SSH
  - Token
---

在我开始使用 GitHub 管理代码和项目的过程中，我一直采用 token 认证的方式进行操作。这种方式简单快捷，适合大多数情况。然而，随着需求的变化，特别是在进行自动化部署时，我意识到使用 SSH 连接 GitHub会更加高效、安全。今天，我想分享一下从 token 认证切换到 SSH 认证的过程，以及成功连接并部署 GitHub 的经历。

## 为什么选择 SSH？

虽然 token 认证在某些情况下非常方便，但它也有一些缺点：

- **安全性**：每次操作都需要使用 token，这可能导致 token 泄漏或滥用的风险。
- **操作繁琐**：每次访问仓库时，都需要手动输入 token或者将它写入本地PATH中，尤其是在多次推送或拉取代码的情况下会很麻烦。
  
相比之下，SSH 认证通过使用公钥和私钥进行加密传输，大大提高了安全性，而且一旦配置完成，就不再需要每次输入凭证。更重要的是，它能为像自动化部署、CI/CD 等工作流提供更好的支持。

## 从 Token 到 SSH：配置过程

### 1. 配置 Git 用户名和邮箱

在设置 SSH 之前，首先需要配置你的 Git 用户名和邮箱，这两个信息将用于提交记录中。这也是 Git 操作的基础设置。

打开终端，执行以下命令：

```bash
git config --global user.name "username"
git config --global user.email "your_email@outlook.com"
```

根据你的`username`名字和`your_email@outlook.com`电子邮件地址。这些信息会出现在每次提交记录中。

### 2. 生成 SSH 密钥对

接下来，我需要在本地生成一个新的 SSH 密钥对。SSH 密钥对包含两个部分：公钥和私钥，公钥可以分享给 GitHub，而私钥则保存在本地计算机上，始终保持私密。

生成密钥对，使用 `ssh-keygen` 命令：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

这里，`-t ed25519` 表示生成 Ed25519 类型的密钥，`-C` 后面的参数是一个注释，用于标识该密钥。

执行命令后，系统会提示你选择密钥文件的存储位置。通常默认存储路径为 `~/.ssh/id_ed25519`，按 Enter 键即可。

然后系统会提示你设置一个密码用于加密 SSH 密钥文件。这个密码是可选的，你可以选择不设置，直接按`Enter`键。

### 3. 创建 .ssh 目录（如果没有）

没有会报错：
```
cd: no such file or directory: /Users/your_username/.ssh
```
说明系统中没有 `.ssh` 目录，可以手动创建该目录。可以使用以下命令来确保目录存在：

```bash
mkdir -p ~/.ssh
```

这样就可以创建 `.ssh` 目录，用于存放你的 SSH 密钥文件。

### 4. 将 SSH 公钥添加到 GitHub

生成 SSH 密钥对后，下一步是将公钥添加到 GitHub 账户，以便 GitHub 识别你的身份。

1. 打开公钥文件：

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

   这将显示你的公钥。复制该公钥内容。

2. 登录 GitHub，访问GitHub SSH 设置页面先点头像：
	`Settings` -> `SSH and GPG keys` -> `New SSH key`

3. 点击 "New SSH key"，输入一个标题（例如 "My MacBook SSH Key"），然后将刚才复制的公钥粘贴到 "Key" 文本框中。

4. 点击 "Add SSH key" 完成添加。

### 5. 配置 SSH 客户端

接下来，我需要配置 SSH 客户端，让它使用正确的密钥连接到 GitHub。编辑 `~/.ssh/config` 文件（如果没有该文件，可以手动创建），并添加以下内容：

```bash
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
  IdentityFile ~/.ssh/id_ed25519
```

这段配置告诉 SSH 客户端，在连接 GitHub 时使用 `~/.ssh/id_ed25519` 作为私钥，并通过端口 443 连接（这个端口通常会被网络防火墙允许）。

### 6. 测试 SSH 连接

配置完成后，我使用以下命令测试 SSH 连接是否成功：

```bash
ssh -T git@github.com
```

如果一切正常，终端会显示如下内容：

```BASH
Hi Your_uesrname! You've successfully authenticated, but GitHub does not provide shell access.
```

这表明你已经成功通过 SSH 连接到 GitHub。



### 7. 修改Hexo配置文件
修改Myblog或者Hexo下的配置文件`—config.yml`，找到`deploy`：
```yml
deploy:
  type: git
  repo: git@github.com:<USERNAME>/<NAME.github.io>.git
  branch: main
```



## 总结

从使用 token 认证切换到 SSH 认证，不仅提高了安全性，还简化了操作流程。虽然设置过程稍显复杂，但一旦配置成功，它为我节省了大量的时间和精力，尤其是在进行自动化部署和持续集成时。通过这种方式，我能够更加高效地管理 GitHub 上的代码和项目。

如果你还在使用 token 方式与 GitHub 进行交互，我强烈建议你尝试一下 SSH 认证。它不仅能提供更高的安全性，也能让你的开发工作更加便捷。
