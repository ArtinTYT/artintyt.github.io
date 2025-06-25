---
title: 1.Attention 理论
date: 2025-04-18 12:32:10
tags:
    - Deep_Learning
    - NLP
    - Attention
categories:
    - Attention
---
# 1. Attention 核心思想

## 1. 动机

- **灵感**：人类处理信息时，会选择性关注关键部分，注意力机制模仿了这一处理方式。
- **作用**：序列模型面对长输入时，注意力机制让模型能分配不同“权重”，聚焦重要信息片段。
- **实现**：为每个输出位置，模型通过**查询（query）** 和 **键（key）** 计算相关性分数，对输入各部分进行加权汇聚，生成上下文表示。

## 2. 非参数注意力池化（Nadaraya-Watson 核回归）

1. **平均汇聚（最简单的回归）**
	- **给定数据**：$(x_i, y_i), i=1,\dots,n$。
	- **平均池化**：是最简单的方案：$f(x) = \frac{1}{n}\sum_{i=1}^n y_i$。
	- **缺点**：无视输入，无法反映输入与输出间的实际关系，表现通常很差。

2. **更好的方案**是 60 年代提出的 **Nadaraya-Watson 核回归**：
	- **改进思路**：不同输入 $x$ 附近的样本应该对输出影响更大，因此引入**核函数 $K$ (Kernel function)**  对输入加权求和。
	- **Nadaraya-Watson核回归公式**：
    $$
    f(x) = \sum_{i=1}^n \frac{K(x - x_i)}{\sum_{j=1}^n K(x - x_j)} y_i,
    $$
    - 这里$K$是核函数（如高斯核），为 $x$ 与 $x_i$ 的距离分配权重。

3. **注意力机制视角**：
	$$f(x) = \sum_{i=1}^n \alpha(x, x_i) y_i$$
	- 根据 $x$ 和 $x_i$ 的相似度计算得到 注意力权重 $\alpha(x, x_i)$ 。
		- $x$：查询（Query）
		- $x_i$：键（Key）
		- $\alpha(x, x_i)$ ：注意力权重
	- $\alpha(x, x_i)$ 非负且归一化（加起来等于1），即概率分布。

## 3. 高斯核 (Gaussian Kernel) & softmax 形式

- **高斯核**定义：
  $$
  K(u) = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{u^2}{2}\right)
  $$
- 代入核回归公式后，$\alpha(x, x_i)$ 可写为 softmax 形式：
	$$\begin{split}\begin{aligned} f(x) &=\sum_{i=1}^n \alpha(x, x_i) y_i\\ &= \sum_{i=1}^n \frac{\exp\left(-\frac{1}{2}(x - x_i)^2\right)}{\sum_{j=1}^n \exp\left(-\frac{1}{2}(x - x_j)^2\right)} y_i \\&= \sum_{i=1}^n \mathrm{softmax}\left(-\frac{1}{2}(x - x_i)^2\right) y_i. \end{aligned}\end{split}$$
 - 解释：$x$ 离哪个 $x_i$近 ，$y_i$ 被分配的权重越大。
 - **非参数模型**：无需显式参数，数据足够时有一致性，能逼近最优预测。
 
## 4. 带参数注意力池化（可学习）

- **参数化注意力**：距离项乘以（可学习的）参数 $w$：
  $$
  f(x) = \sum_{i=1}^n \text{softmax}\left(-\frac{1}{2}[(x - x_i) \cdot w]^2\right) \cdot y_i
  $$
  - $w$ 可通过学习自适应分配 **注意力权重 $\alpha(x, x_i)$**，模型更灵活。


### **总结**

- **注意力机制**核心在于通过query和key分配权重，有偏向性地聚合输入：
  $$
  f(x) = \sum_{i=1}^n \alpha(x, x_i) \cdot y_i
  $$
- **Nadaraya-Watson核回归**可视为最早的注意力池化思想，用核函数对样本加权平均。
- **非参数注意力**权重全依赖输入相似度，带参数版本能通过学习获得更优注意力分布。
- 该思想为现代深度学习注意力机制（如Transformer中的自注意力）打下理论基础。


## 参考资料

[李沐《手动深度学习》：注意力提示](https://zh.d2l.ai/chapter_attention-mechanisms/attention-cues.html)
[李沐《手动深度学习》：注意力汇聚：Nadaraya-Watson 核回归](https://zh.d2l.ai/chapter_attention-mechanisms/nadaraya-waston.html)
