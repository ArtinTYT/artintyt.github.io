---
title: 使用 GitHub Actions 自动部署 Hexo 博客
date: 2025-02-01 04:29:31
tags:
  - Hexo
  - GitHub
categories:
  - Hexo博客
---
# 使用 GitHub Actions 自动部署 Hexo 博客

## **前言**
在本篇博客中，我们将介绍如何使用 **GitHub Actions** 来实现 **Hexo 博客的自动化部署**，让你每次提交新文章时，GitHub Actions 自动编译并部署你的博客到 GitHub Pages，无需手动执行 `hexo deploy`。

---

## **1. 配置 GitHub Actions**

### **1.1 创建 `.github/workflows/deploy.yml` 文件**
在你的 Hexo 博客根目录下执行以下命令，创建 GitHub Actions 配置文件：

```bash
mkdir -p .github/workflows
nano .github/workflows/deploy.yml
```

然后，在 `deploy.yml` 文件中添加以下内容（如果你的远程仓库是 `main` 分支，需要修改 `branches` 为 `main`）：

```yaml
name: Deploy Hexo Blog             # 这是 Actions 的名字，随意命名

# 当 push 事件发生时触发部署
on:
  push:
    branches:
      - main                       # 当推送到 main 分支时触发部署（根据你的分支选择）

jobs:
  deploy:
    runs-on: ubuntu-latest          # 选择运行环境，这里选择最新的 Ubuntu

    steps:
    # 步骤 1：拉取代码
    - name: Checkout repository     # 从 GitHub 仓库拉取代码
      uses: actions/checkout@v2
      with:
        ref: main                   # 选择部署的分支

    # 步骤 2：设置 Node 环境
    - name: Setup Node.js           # 安装 Node.js 环境
      uses: actions/setup-node@v2
      with:
        node-version: 'v22'      # 设置 Node.js 版本

    # 步骤 3：安装依赖
    - name: Install dependencies    # 安装 Hexo 和相关依赖
      run: |
        npm install -g hexo-cli     # 安装 Hexo 命令行工具
        npm install                 # 安装项目依赖

    # 步骤 4：生成静态文件
    - name: Hexo Generate           # 使用 Hexo 生成静态文件
      run: |
        hexo clean                  # 清理旧的生成文件
        hexo generate               # 生成新的静态文件

    # 步骤 5：部署到 GitHub Pages
    - name: Deploy to GitHub Pages  # 使用 Hexo 部署到 GitHub Pages
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE }}   # 使用 GitHub Secrets 中存储的 SSH 私钥
        GIT_NAME: ArtinTYT            # Git 用户名
        GIT_EMAIL: artin_tan@outlook.com # Git 用户邮箱
      run: |
        mkdir -p ~/.ssh/            # 创建 SSH 配置目录
        echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa  # 将私钥写入文件
        chmod 600 ~/.ssh/id_rsa     # 设置私钥权限
        ssh-keyscan github.com >> ~/.ssh/known_hosts  # 将 GitHub 的 SSH 公钥添加到 known_hosts 中
        git config --global user.name "$GIT_NAME"     # 配置 Git 用户名
        git config --global user.email "$GIT_EMAIL"   # 配置 Git 用户邮箱
        hexo deploy                  # 使用 Hexo 部署博客

```

---

## **2. 配置 SSH 密钥**

### **2.1 生成 SSH 密钥**

如果你还没有 SSH 密钥，可以在本地执行以下命令生成：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

然后，找到生成的 `id_rsa.pub` 文件，使用以下命令查看并复制公钥：

```bash
cat ~/.ssh/id_rsa.pub
```

### **2.2 添加公钥到 GitHub**

1. **进入 GitHub 仓库** → **Settings** → **Deploy keys**。
2. **点击 "Add deploy key"**。
3. **Title**: 填写 "GitHub Actions Key"。
4. **Key**: 粘贴 `id_rsa.pub` 的内容。
5. **勾选 "Allow write access"**。
6. **点击 "Add key"**。

### **2.3 添加私钥到 GitHub Secrets**

1. **进入 GitHub 仓库** → **Settings** → **Secrets and variables** → **Actions**。
2. **点击 "New repository secret"**。
3. **Name**: 填写 `SSH_PRIVATE`。
4. **Value**: 粘贴 `id_rsa` 的私钥内容。
5. **点击 "Add secret"**。

---

## **3. 提交并触发 GitHub Actions**

执行以下命令，将 `deploy.yml` 配置文件提交到 GitHub：

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions for Hexo deployment"
git push origin main  # 如果你的远程分支是 main
```

推送代码后，GitHub Actions 会自动执行部署。

---

## **4. 检查 GitHub Actions 是否成功**

### **4.1 查看 Actions 运行状态**
1. 打开 GitHub 仓库。
2. 点击 **Actions** 选项卡。
3. 查看最新的 Workflow 运行记录。
4. 如果显示绿色 ✅，说明部署成功；如果失败，则查看日志分析问题。

### **4.2 访问你的博客**
GitHub Pages 更新可能需要几分钟，稍等后访问：
```bash
https://artintyt.github.io
```
如果看到最新内容，说明部署成功！🎉

---

## **5. 本地更新博客并推送**

当你本地修改博客内容后，使用以下命令提交并触发 GitHub Actions：

```bash
git add .
git commit -m "Update blog content"
git push origin main  # 远程是 main
```

然后等待 GitHub Actions 自动更新你的博客。
>注意：当要修改 `.github/workflows/deploy.yml` 文件时，记得切换到 `master` 分支，使用以下：
>```bash
>git checkout master 
>```

---

## **6. 总结**

- **配置 GitHub Actions**，让博客自动部署。
- **设置 SSH 密钥**，让 GitHub Actions 有权限推送代码。
- **每次 `git push`，GitHub Actions 自动触发部署**。
- **博客自动更新到 GitHub Pages，无需手动运行 `hexo deploy`**。

这样，你的 Hexo 博客就实现了 **全自动化部署**，再也不需要手动执行 `hexo deploy` 了！🎉

---

### **💡 你学到了什么？**

- **GitHub Actions 的基本使用方法**。
- **如何使用 SSH 密钥进行自动部署**。
- **如何让 Hexo 博客自动化更新**。

如果你有任何问题，欢迎留言交流！🚀

