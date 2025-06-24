---
title: 4.长短期记忆网络 LSTM
date: 2025-04-17 15:22:30
tags:
    - DL
    - RNN
categories:
    - Deep Learning
---
# 4. 长短期记忆网络（Long short-term memory, LSTM）

- 核心思想：LSTM 通过引入“门控”机制，能够选择性地记住有用信息、忘记无用信息，有效缓解RNN在处理长序列时的“梯度消失”和“长期依赖”问题。

## 1. 门结构与功能

- **忘记门（Forget Gate）$F_t$**：决定前一时刻记忆 $C_{t-1}$ 有多少被保留到当前时刻，$F_t$ 取0则完全遗忘，取1则全部保留。
- **输入门（Input Gate）$I_t$**：决定当前时刻新信息（候选记忆单元 $\tilde{C}_t$）有多少被写入记忆单元。
- **输出门（Output Gate）$O_t$**：决定当前细胞状态 $C_t$ 有多少信息被输出到最终隐状态 $H_t$。

## 2. 计算流程

- 门的计算
    $$
    \begin{aligned}
    I_t &= \sigma(X_t W_{xi} + H_{t-1} W_{hi} + b_i)  \\
    F_t &= \sigma(X_t W_{xf} + H_{t-1} W_{hf} + b_f)  \\
    O_t &= \sigma(X_t W_{xo} + H_{t-1} W_{ho} + b_o) 
    \end{aligned}
    $$
	- $\sigma$ 是sigmoid激活，输出范围$(0,1)$。
	
- 候选记忆单元（candidate memory cell）
	$$\tilde{C}_t = \tanh(X_t W_{xc} + H_{t-1} W_{hc} + b_c)$$
	- $\tanh$ 输出范围$(-1, 1)$。
	- <img src="/images/RNN/img_LSTM-PreM.png" width=380 />

- 记忆单元（Memory Cell）更新
	$$C_t = F_t \odot C_{t-1} + I_t \odot \tilde{C}_t$$
	- $F_t$ 控制遗忘多少旧信息，$I_t$控制写入多少新信息。
	- $\odot$ 表示元素乘。
	- <img src="/images/RNN/img_LSTM-M.png" width=400 />

- 隐状态（Hidden State）输出
	$$H_t = O_t \odot \tanh(C_t)$$
	- $O_t$ 控制 $C_t$ 有多少被输出。
	- <img src="/images/RNN/img_LSTM-H.png" width=400 />
	  

## 3. 总结

- **Forget Gate** 决定遗忘/保留旧记忆，**Input Gate** 控制新信息写入，**Output Gate** 控制输出多少记忆作为当前隐状态。
- LSTM 能有效捕获长距离依赖，解决RNN难以处理的序列建模问题。
- 广泛应用于语言建模、机器翻译、序列标注等任务。
- 公式
$$
\begin{aligned}
I_t &= \sigma(X_t W_{xi} + H_{t-1} W_{hi} + b_i) \\
F_t &= \sigma(X_t W_{xf} + H_{t-1} W_{hf} + b_f) \\
O_t &= \sigma(X_t W_{xo} + H_{t-1} W_{ho} + b_o) \\
\tilde{C}_t &= \tanh(X_t W_{xc} + H_{t-1} W_{hc} + b_c) \\
C_t &= F_t \odot C_{t-1} + I_t \odot \tilde{C}_t \\
H_t &= O_t \odot \tanh(C_t)
\end{aligned}$$
- **通俗理解**：LSTM 就像一个“智能记事本”，能随时决定擦掉哪些旧内容、记下哪些新内容、对外展示哪些重点，让信息流动更有条理。

## 参考资料
- [《动手学深度学习》（李沐）：LSTM](https://zh-v2.d2l.ai/chapter_recurrent-modern/lstm.html)
- [Bilibili 视频讲解：LSTM](https://www.bilibili.com/video/BV1JU4y1H7PC/)