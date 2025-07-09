---
title: 2. 注意力分数
date: 2025-04-19 12:01:10
tags:
    - Attention
    - Score
    - NLP
    - Deep_Learning
    - AI
categories:
    - Attention
---
# 2. Attention Scoring Function

## 1. 基本思想

- **注意力机制**的核心：根据**查询**（query，$\mathbf{q}$）和**键**（key，$\mathbf{k}_i$）的相关性分配权重，从所有值（value，$\mathbf{v}_i$）中"加权取信息"。
- **定义**：注意力机制通过给每个值 $\mathbf{v}_i$ 分配权重 $\alpha(\mathbf{q}, \mathbf{k}_i)$，加权求和得到输出：
$$
\mathbf{f}(\mathbf{q}) = \sum_{i=1}^m \alpha(\mathbf{q}, \mathbf{k}_i)\, \mathbf{v}_i​
$$

- 其中 $\alpha(\mathbf{q}, \mathbf{k}_i)$ 是 attention 权重，由分数 $a(\mathbf{q}, \mathbf{k}_i)$ 经过 softmax 得到：
	$$\alpha(\mathbf{q}, \mathbf{k}_i) = \frac{\exp(a(\mathbf{q}, \mathbf{k}_i))}{\sum_{j=1}^m \exp(a(\mathbf{q}, \mathbf{k}_j))}$$
	
	<img src="/images/img/img_Att_scoring.png" width=400 style="display: block; margin: 0 auto;"/>​

## 2. 拓展到高维度
- **假设**：查询 $q \in \mathbb{R}^q$，$m$ 对键值对 $(\mathbf{k}_1, \mathbf{v}_1), \ldots, (\mathbf{k}_m, \mathbf{v}_m)$，其中 $K_i \in \mathbb{R}^k$, $V_i \in \mathbb{R}^v$。
- **注意力池化层**：
  $$
  f(\mathbf{q}, (\mathbf{k}_1, \mathbf{v}_1), \ldots, (\mathbf{k}_m, \mathbf{v}_m)) = \sum_{i=1}^m \alpha(\mathbf{q}, \mathbf{k}_i) \mathbf{v}_i \in \mathbb{R}^v,
  $$
- **注意力分数**：
$$\alpha(\mathbf{q}, \mathbf{k}_i) = \mathrm{softmax}(a(\mathbf{q}, \mathbf{k}_i)) = \frac{\exp(a(\mathbf{q}, \mathbf{k}_i))}{\sum_{j=1}^m \exp(a(\mathbf{q}, \mathbf{k}_j))} \in \mathbb{R}.$$

- 其中 $\alpha(\mathbf{q}, \mathbf{k}_i)$ 是衡量 $\mathbf{q}$ 和 $\mathbf{k}_i$ 相似度的函数。


## 3. 常见打分函数

1. **加性注意力（Additive Attention）**
	- **可学习参数**：$\mathbf{W}_q \in \mathbb{R}^{h \times d_q}$，$\mathbf{W}_k \in \mathbb{R}^{h \times d_k}$，$\mathbf{w}_v \in \mathbb{R}^{h}$
	- **打分公式**：
	  $$a(\mathbf q, \mathbf k) = \mathbf w_v^\top \text{tanh}(\mathbf W_q\mathbf q + \mathbf W_k \mathbf k) \in \mathbb{R}$$
	- 将 $q$ 和 $K$ 连接后输入单隐层 MLP，隐层单元数为 $h$。

2. **缩放/点积注意力（Scaled Dot-Product Attention）**
	- **条件**：若 $q$ 和 $K_i$ 长度相同（$q, K_i \in \mathbb{R}^d$）。
	- **打分公式**（未缩放）：
		$$a(\mathbf{q}, \mathbf{k}) = \mathbf{q}^\top \mathbf{k}$$

	- **缩放点积注意力**（Transformer常用）：
		- 归一化防止大数值带来训练不稳定
	    $$a(\mathbf{q}, \mathbf{k}) = \frac{\mathbf{q}^\top \mathbf{k}}{\sqrt{d}}$$

	    
	- **向量化版本**：
		- 输入：$Q \in \mathbb{R}^{n \times d}$, $K \in \mathbb{R}^{m \times d}$, $V \in \mathbb{R}^{m \times v}$
		- **注意力评分**：
		$$a(\mathbf q, \mathbf k) = \mathbf{q}^\top \mathbf{k}  /\sqrt{d}. \in \mathbb{R}^{n \times m}$$
		- **注意力池化**：
	    $$f = \text{softmax}(a(Q, K)) V = \mathrm{softmax}\left(\frac{\mathbf Q \mathbf K^\top }{\sqrt{d}}\right) \mathbf V \in \mathbb{R}^{n\times v}.$$

## 4. 总结

- **注意力分数**：衡量 $query$ 和 $key$ 的相似度，注意力权重是分数的 softmax 结果。
- **两种常见分数计算方式**：
	1. 将 $query$ 和 $key$ 合并输入单输出单隐层的 MLP。
	2. 直接计算 $query$ 和 $key$ 的内积（需缩放）。


## 参考资料

[李沐《手动深度学习》：注意力分数](https://zh.d2l.ai/chapter_attention-mechanisms/attention-scoring-functions.html)
[Bilibili：注意力分数](https://www.bilibili.com/video/BV1Tb4y167rb/)
