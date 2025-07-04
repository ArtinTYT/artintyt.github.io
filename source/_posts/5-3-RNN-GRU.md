---
title: 3.门控循环单元 GRU
date: 2025-04-17 14:53:30
tags:
    - Deep_Learning
    - RNNs
categories:
    - RNNs
---

# 3. 门控循环单元（Gated Recurrent Unit, GRU）

- **核心思想**：GRU 能动态决定当前时刻要"记住"多少过去的信息、要"遗忘"多少无用内容，从而有效缓解传统RNN的长期依赖问题。它通过"更新门"和"重置门"两个机制，灵活调整信息流。

## 1. **信息处理机制**

- 不是每个历史信息都同等重要，GRU能自动筛选：
	- **更新门（Update Gate）**$Z_t$：决定当前隐状态 $H_t$ 有多少来自之前的 $H_{t-1}$，有多少来自新的候选状态 $\tilde{H}_t$。
	- **重置门（Reset Gate）**$R_t$：控制在生成候选隐状态 $\tilde{H}_t$ 时，允许历史状态 $H_{t-1}$ 保留多少参与计算——即决定遗忘多少过去信息。

## 2. 计算流程

- **门的计算**
	- **Reset gate**：$R_t = \sigma(X_t W_{xr} + H_{t-1} W_{hr} + b_r)$
	- **Update gate**：$Z_t = \sigma(X_t W_{xz} + H_{t-1} W_{hz} + b_z)$

- **候选隐状态（Candidate hidden state）**： 
    $$\tilde{H}_t = \tanh(X_t W_{xh} + (R_t \odot H_{t-1}) W_{hh} + b_h)$$
	- $R_t$ 控制 $H_{t-1}$ 的遗忘程度
	- $\odot$：元素相乘（Element-wise Multiplication）
	- $R_t \odot H_{t-1}$ 表示历史信息"筛选"后参与计算。
	- $tanh$ 激活将输出限制在 $[-1, 1]$。
	<img src="/images/img/img_GRU-preH.png" width=400 style="display: block; margin: 0 auto;" />


- **隐状态（Hidden state）**：  
    $$H_t = Z_t \odot H_{t-1} + (1 - Z_t) \odot \tilde{H}_t$$
	- $Z_t$：控制$H_t$保留多少旧信息
	- $1-Z_t$：控制引入多少新信息
	<img src="/images/img/img_GRU_H.png" width=400 style="display: block; margin: 0 auto;" />

## 3. **总结**

- **Reset Gate（重置门）**：决定历史信息参与新状态生成的多少，有助于捕获**短期依赖**。
- **Update Gate（更新门）**：决定当前状态更多依赖过去还是新信息，有助于**长期依赖**建模。
- **公式汇总**：
$$
\begin{aligned}
R_t &= \sigma(X_t W_{xr} + H_{t-1} W_{hr} + b_r) \\
Z_t &= \sigma(X_t W_{xz} + H_{t-1} W_{hz} + b_z) \\
\tilde{H}_t &= \tanh(X_t W_{xh} + (R_t \odot H_{t-1}) W_{hh} + b_h) \\
H_t &= Z_t \odot H_{t-1} + (1 - Z_t) \odot \tilde{H}_t
\end{aligned}
$$
- **通俗理解**：GRU 就像"信息筛选器"，每个时间步自动判断保留多少旧知识、吸收多少新知识，让神经网络更聪明地理解和处理序列信息。

## 参考资料
- [李沐《动手学深度学习》：GRU](https://zh-v2.d2l.ai/chapter_recurrent-modern/gru.html)
- [Bilibili：GRU](https://www.bilibili.com/video/BV1mf4y157N2/)

