---
title: 1.词嵌入（Word Embedding，Word2Vec）
date: 2025-04-18 10:12:30
tags:
    - Word2Vec
    - Embedding
    - NLP
    - Deep_Learning
    - AI

categories:
    - NLP
---
# 1. 词嵌入（Word Embedding，Word2Vec）

## 1. 动机

- **独热向量（one-hot）** 的问题：
    1. **高维稀疏性**：独热向量维度极高，且大部分元素为 0。
	2. **缺乏语义相似性**：无法表达词语间的语义关系（例如，"猫"和"狗"都是动物，但向量点积为 0）。
	
## 2. 自监督 Word2Vec

- **目标**：将每个词映射到一个低维稠密向量，使语义相近的词在向量空间中彼此靠近。
- 通过上下文（context）或中心词（centre word）来训练词向量，包含两种模型结构：
	1. **Skip-Gram**：给定中心词，预测其上下文词。例如：`"apple" → "eat", "red"`。
	2. **CBOW (Continuous Bag-of-Words)**：给定上下文词，预测中心词。例如：`"cat", "dog" → "animal"`。
        
## 3. Skip-Gram 模型

- **目标**：给定中心词 $w_c$​，预测其上下文词 $w_o$​。
- **建模思路**：
	- 对于序列 $w_1, w_2, ..., w_T$，给定中心词 $w_t$，预测窗口内的上下文词 $w_{t-m}, ..., w_{t-1}, w_{t+1}, ..., w_{t+m}$。
	- 每个词有两种向量表示：作为中心词的向量 $v_i \in \mathbb{R}^d$，作为上下文的向量 $u_i \in \mathbb{R}^d$。    
- **条件概率计算**：
    $$P(w_o \mid w_c) = \frac{\text{exp}(\mathbf{u}_o^\top \mathbf{v}_c)}{ \sum_{i \in \mathcal{V}} \text{exp}(\mathbf{u}_i^\top \mathbf{v}_c)}$$
    - 词表索引集合 $\mathcal{V} = \{0, 1, \ldots, |\mathcal{V}|-1\}$，给定长度为 $T$ 的文本序列。
    
- **损失函数**（负对数似然）：
    $$- \sum_{t=1}^{T} \sum_{-m \leq j \leq m,\ j \neq 0} \text{log}\, P(w^{(t+j)} \mid w^{(t)}).$$
- **计算优化**：直接计算softmax对大词表太慢，实际训练用 **负采样** 或 **层次softmax** 近似。

## 4. CBOW 模型

1. **目标**：给定上下文词，预测其中心词。
2. **模型结构**
	- **上下文词的向量取平均**：
	    $$\bar{v}_o = \frac{1}{2m} \sum_{k=1}^{2m} v_{k_o}$$
	    其中 $m$ 为上下文窗口大小。
	    
	- **条件概率计算**：
	    $$P(w_c \mid \mathcal{W}_o) = \frac{\exp\left(\mathbf{u}_c^\top \bar{\mathbf{v}}_o\right)}{\sum_{i \in \mathcal{V}} \exp\left(\mathbf{u}_i^\top \bar{\mathbf{v}}_o\right)}.$$
3. **训练**
	- **损失函数**：最小化负对数似然：
	    $$J= -\sum_{t=1}^T  \text{log}\, P(w^{(t)} \mid  w^{(t-m)}, \ldots, w^{(t-1)}, w^{(t+1)}, \ldots, w^{(t+m)}).$$
	- **梯度计算**：对上下文词向量 $v_{o_i}$​​ 的梯度：
	    $$\frac{\partial \log\, P(w_c \mid \mathcal{W}_o)}{\partial \mathbf{v}_{o_i}} =  \frac{1}{2m}\left(\mathbf{u}_c - \sum_{j \in \mathcal{V}} P(w_j \mid \mathcal{W}_o) \mathbf{u}_j \right)$$
	- 这里其实是对 CBOW 损失函数的梯度公式。注意梯度实际会依赖于负采样的采样方式。​

## 5. 总结

- **Embedding**：本质是将词映射到实向量的技术，通过空间距离反映语义相似性。
- **Word2Vec**包含 Skip-Gram 和 CBOW 两种主流结构。
    - **Skip-Gram**：适合小数据集，对低频词表现更好。
    - **CBOW**：训练更快，适合大数据集，对高频词更鲁棒。
- **局限性**：
    - 无法处理一词多义。
    - 只依赖局部上下文窗口，无法捕捉全局统计信息。

## 参考资料

- [李沐《动手学深度学习》：词嵌入（Word Embedding，Word2Vec）](https://zh-v2.d2l.ai/chapter_recurrent-modern/lstm.html)