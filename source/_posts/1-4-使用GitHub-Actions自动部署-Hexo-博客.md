---
title: 4.使用 GitHub Actions 自动部署 Hexo 博客
date: 2025-01-15 14:29:31
tags:
  - Hexo
  - GitHub
  - SSH
categories:
  - Hexo
---


### **前言**
在本篇博客中，我们将介绍如何使用 **GitHub Actions** 来实现 **Hexo 博客的自动化部署**，让你每次提交新文章时，GitHub Actions 自动编译并部署你的博客到 GitHub Pages，无需手动执行 `hexo deploy`。同时，我们也会介绍如何使用专门的 `gh-pages`（或你命名的 `ph-pages`）分支来存放生成的静态页面，从而保持源码和生成文件的分离。

---

## **1. 配置 GitHub Actions**

### **1.1 创建 `.github/workflows/deploy.yml` 文件**
在你的 Hexo 博客根目录下执行以下命令，创建 GitHub Actions 配置文件：

```bash
mkdir -p .github/workflows
nano .github/workflows/deploy.yml
```

在 **deploy.yml** 文件中添加以下内容（如果你的远程仓库默认分支为 `master`，则触发条件与拉取分支都使用 `master`；如果你使用其他分支，请相应调整）：

```yaml
name: Deploy Hexo Blog             # GitHub Actions 的名称，可自行命名

# 当 push 事件发生时触发部署
on:
  push:
    branches:
      - master                       # 当推送到 master 分支时触发部署（根据你的分支选择）

jobs:
  deploy:
    runs-on: ubuntu-latest          # 运行环境选择最新的 Ubuntu

    steps:
    # 步骤 1：拉取代码
    - name: Checkout repository     # 从 GitHub 仓库拉取代码
      uses: actions/checkout@v2
      with:
        ref: master                   # 拉取 master 分支代码

    # 步骤 2：设置 Node 环境
    - name: Setup Node.js           # 安装 Node.js 环境
      uses: actions/setup-node@v2
      with:
        node-version: 'v22'           # 设置 Node.js 版本

    # 步骤 3：安装依赖
    - name: Install dependencies    # 安装 Hexo 和相关依赖
      run: |
        npm install -g hexo-cli     # 安装 Hexo 命令行工具
        npm install                 # 安装项目依赖

    # 步骤 4：生成静态文件
    - name: Hexo Generate            # 使用 Hexo 生成静态文件
      run: |
        hexo clean                  # 清理旧的生成文件
        hexo generate               # 生成新的静态文件

    # 步骤 5：部署到 GitHub Pages (部署到 gh-pages 分支)
    - name: Deploy to GitHub Pages   # 使用 Hexo 部署到 GitHub Pages
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE }}   # 使用 GitHub Secrets 中存储的 SSH 私钥
        GIT_NAME: <Git 用户名>                           # Git 用户名
        GIT_EMAIL: <Git用户邮箱>             # Git 用户邮箱
      run: |
        mkdir -p ~/.ssh/                              # 创建 SSH 配置目录
        echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa  # 将私钥写入文件
        chmod 600 ~/.ssh/id_rsa                       # 设置私钥权限
        ssh-keyscan github.com >> ~/.ssh/known_hosts  # 添加 GitHub 的 SSH 公钥到 known_hosts
        git config --global user.name "$GIT_NAME"     # 配置 Git 用户名
        git config --global user.email "$GIT_EMAIL"    # 配置 Git 用户邮箱
        hexo deploy                                   # 使用 Hexo 部署博客
```

> **注意：**  
> 1. 在 Hexo 配置文件 `_config.yml` 中，部署部分应配置为使用 `gh-pages` 分支（或你命名的 `ph-pages` 分支），例如：
>    ```yaml
>    deploy:
>      type: git
>      repo: git@github.com:你的用户名/你的仓库.git
>      branch: gh-pages   # 或者根据你的实际情况设置为 ph-pages
>    ```
> 2. 这样可以保证你的源代码存放在 `master` 分支，而生成的静态页面将推送到 `gh-pages` 分支，从而使博客部署更清晰规范。

---

## **2. 配置 SSH 密钥**

### **2.1 生成 SSH 密钥**

#### **检查是否已有 SSH 密钥**
你可以运行下面的命令来确认是否已有 SSH 密钥：
```bash
ls ~/.ssh
```
如果看到 `id_rsa` 和 `id_rsa.pub`，说明你已经生成了 SSH 密钥。

#### **查看密钥内容**
- **查看私钥**（不要泄露此文件）：
  ```bash
  cat ~/.ssh/id_rsa
  ```
- **查看公钥**（可公开分享）：
  ```bash
  cat ~/.ssh/id_rsa.pub
  ```

#### **生成新的 SSH 密钥（如果没有）**
如果没有密钥，可以使用下面的命令生成：
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
替换 `"your_email@example.com"` 为你的 GitHub 绑定邮箱，然后一路按 **Enter** 即可。

>注意：如果 Github 说公钥 `已经被使用` ，可以使用命令再次生成私钥和公钥，同时去 Github 修改项目下的 `Setting` 就可以了。

---

### **2.2 添加公钥到 GitHub**

1. 进入 GitHub 仓库页面，点击 **Settings** → **Deploy keys**。
2. 点击 **"Add deploy key"**。
3. 在 **Title** 中填写 "GitHub Actions Key"。
4. 在 **Key** 中粘贴你通过 `cat ~/.ssh/id_rsa.pub` 获取的公钥内容。
5. 勾选 **"Allow write access"** 以允许写入权限。
6. 点击 **"Add key"** 完成设置。

---

### **2.3 添加私钥到 GitHub Secrets**

1. 进入 GitHub 仓库页面，点击 **Settings** → **Secrets and variables** → **Actions**。
2. 点击 **"New repository secret"**。
3. 将 **Name** 填写为 `SSH_PRIVATE`。
4. 将 **Value** 粘贴你私钥（`id_rsa`）的内容。
5. 点击 **"Add secret"** 完成设置。

>注意：前面 **deploy.yml** 文件中配置了 `SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE }}` 其中 `SSH_PRIVATE` 与你写的 `Name` 对应即可。
---

## **3. 提交并触发 GitHub Actions**

将 `deploy.yml` 文件提交到仓库，以触发 GitHub Actions 自动部署：
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions for Hexo deployment"
git push origin master  # 如果你的远程分支是 master
```

推送代码后，GitHub Actions 会自动运行部署流程，并将 Hexo 生成的静态文件推送到 `gh-pages` 分支。

### **测试 SSH 连接到 GitHub**
在 SSH 设置完成后，你可以运行：
```bash
ssh -T git@github.com
```
如果成功，你会看到：
```bash
Hi ArtinTYT! You've successfully authenticated, but GitHub does not provide shell access.
```


## **4. 检查部署状态**

### **4.1 查看 GitHub Actions 状态**
1. 打开 GitHub 仓库页面，点击 **Actions** 选项卡。
2. 查看最新的 Workflow 运行记录。如果显示绿色 ✅，说明部署成功；否则查看日志查找错误信息。

### **4.2 配置 GitHub Pages**
进入 GitHub 仓库页面：
1. 点击 **Settings** → **Pages**。
2. 将 **Source** 设置为 `gh-pages`（或你使用的分支，如 ph-pages）。
3. 保存设置，等待几分钟后访问：
   ```bash
   https://artintyt.github.io
   ```
   如果页面显示你的博客内容，则部署成功。



## **5. 本地更新博客并触发部署**

当你在本地更新博客内容后，使用以下命令提交并推送：
```bash
hexo clean
hexo generate
hexo deploy
```
GitHub Actions 会自动运行并更新静态页面到 `gh-pages` 分支，GitHub Pages 会随之更新。

然后等待 GitHub Actions 自动更新你的博客。
>注意：当要修改 `.github/workflows/deploy.yml` 文件时，记得切换到 `master` 分支，使用以下：
> ```bash
> git checkout master 
> ```

记得修改后要提交更改，使用一下命令：
```bash
git add source/_posts/使用-GitHub-xxxx.md
git commit -m "Save changes to the GitHub Actions deployment post"

```


## 6. 参数的安全隐患及优化方式
如何安全地存储敏感信息，使用 GitHub Secrets 代替明文配置，你的 **deploy.yml** 里目前可能有类似的内容：
```yaml
env:
  GIT_NAME: <your username>
  GIT_EMAIL: <your email address>
```

### 优化方式：使用 Secret 变量名替代
1. 进入你的 **GitHub 仓库** → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret** 创建 Secrets 变量（之前`SSH_PRIVATE`同样的地方）：
- GIT_NAME → `<your username>`
- GIT_EMAIL → `<your email address>`
- SSH_PRIVATE_KEY → 存储你的 SSH 私钥
- 点击 **Add secret**
3. 修改 deploy.yml，使用 Secrets：
```yaml
env:
  GIT_NAME: ${{ secrets.GIT_NAME }}
  GIT_EMAIL: ${{ secrets.GIT_EMAIL }}
  SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
```
这样，即使别人能看到 **deploy.yml** 文件，也无法获取你的邮箱和 SSH 私钥。



## **7. GitHub Actions 的优点**

使用 GitHub Actions 有以下几个明显的优点：

- **自动化部署：** 每次代码提交后自动触发构建和部署流程，无需手动干预。
- **持续集成：** 可集成测试、代码检查等流程，确保部署前代码质量。
- **高度自定义：** 支持自定义工作流程和并行任务，可根据项目需求灵活配置。
- **跨平台支持：** 支持在 Ubuntu、Windows、macOS 等不同平台上运行，无需额外环境搭建。
- **与 GitHub 深度集成：** 无需额外配置第三方 CI/CD 工具，所有操作均在 GitHub 平台上完成。
- **易于监控和调试：** 提供详细的日志记录，可在 GitHub Actions 页面直观查看每一步执行状态。



## **总结**

- **配置 GitHub Actions**：实现博客自动部署，无需手动执行 `hexo deploy`。
- **设置 SSH 密钥**：保证 GitHub Actions 有权限将生成的静态页面推送到 `gh-pages` 分支。
- **分支管理**：源代码存放在 `master` 分支，生成的静态页面存放在 `gh-pages`（或 ph-pages）分支，使仓库结构清晰。
- **持续自动化**：每次 `git push` 后，GitHub Actions 自动触发部署流程，确保博客内容始终保持最新状态。

通过以上配置，你的 Hexo 博客将实现全自动化部署，并利用 GitHub Actions 强大的集成优势，让博客更新变得轻松高效！🎉
