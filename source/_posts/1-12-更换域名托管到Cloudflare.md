---
title: 12. 更换域名的 DNS 服务器
date: 2025-06-05 12:25:04
categories: 
  - Hexo
tags: 
  - Hexo
  - js
  - DNS
  - domain
  - Github
  - deploy
---


在这篇博客中，我将分享如何通过更换 DNS 服务器来管理你的域名，特别是如何将域名从阿里云迁移到 Cloudflare，并在 GitHub Pages 上成功配置自定义域名。我会详细介绍每一步的操作，确保你能够顺利完成 DNS 设置，避免常见的错误，并启用 HTTPS 保证站点的安全。

## **1. 在阿里云更换 DNS 服务器**

### 步骤：

1. **登录到阿里云控制台**：

   * 打开 [阿里云官网](https://www.aliyun.com/)。
   * 使用你的账户登录。

2. **进入域名管理**：

   * 在左侧菜单中选择 **"域名与网站"** -> **"域名管理"**。
   * 找到你要修改的域名，点击右侧的 **"管理"** 按钮。

3. **修改 DNS 服务器**：

   * 在域名管理页面，选择 **"DNS 服务器设置"**。
   * 点击 **"修改DNS服务器"**。
   * 选择 **"自定义DNS服务器"**，并输入 **Cloudflare 提供的 DNS 地址** 例如：

     * `ns1.cloudflare.com`
     * `ns2.cloudflare.com`

4. **提交修改**：

   * 点击 **提交修改**，完成 DNS 服务器的更换。

5. **注意**：

    - 在阿里云中将域名的 DNS服务器改为其他DNS服务商（如Cloudflare、腾讯云、自建DNS等） 后，阿里云就不再负责该域名的解析工作了。
    - 阿里云控制台中的"云解析"页面仍然会显示该域名，只是这些解析记录不会再生效 。
    - 这些旧的解析记录仍然保留在阿里云上，是因为你没有主动删除它们，也不会自动清除。

## **2. 在 Cloudflare 设置 DNS 配置**

### 步骤：

1. **登录到 Cloudflare 控制台**：

   * 访问 [Cloudflare 官网](https://www.cloudflare.com/) 并登录你的账户。

2. **添加你的域名**：

   * 在 **Cloudflare Dashboard** 中，点击 **Add** -> **Connect a domain**，然后输入你刚才修改 DNS 的域名（如 `neurowave.tech`）。
   * 点击 **Add Site**，Cloudflare 会自动扫描并导入你的 DNS 记录。

3. **添加 DNS 记录**：

   * **根域名 `@` 设置 A 记录**，指向 GitHub Pages 的 IP 地址。确保你添加以下四条 A 记录：

     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`

   * **设置 `www` 子域名的 CNAME 记录**，指向 `artintyt.github.io`（你的 GitHub Pages 地址）。

     | 主机记录  | 记录类型  | 记录值                  |
     | ----- | ----- | -------------------- |
     | `@`   | A     | `185.199.108.153`    |
     | `@`   | A     | `185.199.109.153`    |
     | `@`   | A     | `185.199.110.153`    |
     | `@`   | A     | `185.199.111.153`    |
     | `www` | CNAME | `artintyt.github.io` |

4. **启用 Proxied 模式**：

   * 确保 **`www`** 和 **根域名（`@`）** 的记录状态为 **"Proxied"**（橙色云标志），这将使得 Cloudflare 的 CDN 和加速服务生效。


5. **添加 TXT 记录用于域名认证**  

    - GitHub Pages 要求你在 DNS 中添加一个 TXT 记录 来验证你对域名的所有权。以下是你需要在 Cloudflare DNS 中添加的记录：

        - 在 Cloudflare DNS 配置页面 中，添加 TXT 记录：
        - 主机记录：@（根域名）
        - 记录类型：TXT
        - `Name`类似: github-pages-challenge-artintyt="xxxx-xxxx-xxxx"
        - `Content`类似: "adfsaskdfjsdjxxfjdksj"
    
    - 保存配置并等待生效。

    - 可以通过 dnschecker.org 检查 TXT 记录是否已经传播到全球 DNS。
        
    - 你可以参考 GitHub 官方文档的详细步骤：[GitHub Pages 配置域名验证](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) 

>**重要提示：防止域名盗用**:  
>为了 防止域名被盗用，确保你按照 GitHub 的要求在 DNS 中添加正确的 TXT 记录，通过 GitHub 验证你对域名的所有权。这个步骤可以防止他人伪造和篡改你的域名配置，从而保护你的站点不受恶意攻击。
>
>在完成 TXT 记录配置后，GitHub 会自动检测并验证你对域名的所有权。这样不仅确保了你对域名的控制权，还提升了安全性。

<img src="/images/DNS.png" style="display: block; margin: 0 auto;" />

## **3. 配置 SSL 和安全设置**

1. **启用 HTTPS**：

   * 在 **Cloudflare Dashboard** 中，点击 **SSL/TLS**，启用 **Flexible** 或 **Full** SSL。
   * 启用 **"Always Use HTTPS"**，强制所有访问者通过 HTTPS 访问你的网站。

2. **自动重写 HTTPS**：

   * 启用 **Automatic HTTPS Rewrites**，将所有 HTTP 链接自动重写为 HTTPS，避免混合内容错误。


## **4. 等待 DNS 配置生效**

* **DNS 生效时间**：通常会在 **10 分钟到 1 小时** 内完成，最长 24 小时内生效。
* 你可以使用 **[DNS Checker](https://dnschecker.org/)** 检查 DNS 记录是否已经生效。
