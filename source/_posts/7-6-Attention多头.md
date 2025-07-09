---
title: 6. Multi-Head Self-Attention 多头自注意力
date: 2025-04-19 15:55:19
tags:
	- Multi-Head_Attention
	- NLP
	- Deep_Learning
	- Transformer
	- AI
categories:
    - Attention
---

# 6. Multi-Head Self-Attention 多头自注意力

## 1. 核心思想

- **多头注意力（Multi-Head Attention）** 是在自注意力（self-attention）基础上的扩展，通过并行设置多个"注意力头"（head），让模型能从不同子空间提取信息，提升表达能力和鲁棒性。

## 2. 基本结构

- **基本思路**：将 query、key、value 线性投影到多个子空间，每个子空间分别计算自注意力，最后拼接各头输出并再映射，得到最终结果。
- **优势**：不同头关注不同位置、特征或信息，有利于模型获得更多维度的表示能力。
- **工作流程**：
	1. 对输入的 Q/K/V 分别用 $h$ 组参数进行线性变换，获得 $h$ 组（通常降维）Q/K/V。
	2. 每组独立计算自注意力（和单头 attention 机制一致）。
	3. 将 $h$ 个头的输出沿特征维度拼接。
	4. 拼接结果通过一层线性变换，输出最终多头注意力的结果。

## 3. 数学表达

- 设有 $h$ 个头，每头参数独立
- **第 $i$ 个头**：  
	$$\text{head}_i = \mathrm{Attention}(Q W_i^Q,, K W_i^K,, V W_i^V)$$
- **多头输出拼接与映射**：  
	$$\mathrm{MultiHead}(Q, K, V) = \mathrm{Concat}(\text{head}_1, \dots, \text{head}_h) W^O$$
- **缩放点积注意力**：  
	$$\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{Q K^\top}{\sqrt{d_k}}\right)V$$
- **维度约定**：
	- 输入总维度 $d_{\text{model}}$，头数 $h$
	- 每头维度 $d_k = d_v = d_{\text{model}}/h$
	- 参数 $W_i^Q, W_i^K, W_i^V \in \mathbb{R}^{d_{\text{model}} \times d_k}$，$W^O \in \mathbb{R}^{hd_v \times d_{\text{model}}}$

## 4. 总结

- 多视角表达：不同头可关注不同语义、位置或依赖，有效捕捉多样特征和关系。
- 表达力提升：支持同时建模局部与全局依赖，多层堆叠效果更强。
- **高效并行**：所有头可同步计算，结构友好于 GPU 并行。
- **广泛应用**：是 Transformer 及 BERT、GPT、ViT 等主流模型的核心模块。
- **头数可调**：常用 8 或 16 头（h 为超参数）。
- **本质总结**：多头注意力机制即多个"缩放点积自注意力"并行，拼接输出后再线性变换。


## 参考

[李沐《手动深度学习》：Multi-Head Self-Attention](https://zh.d2l.ai/chapter_attention-mechanisms/multihead-attention.html)



