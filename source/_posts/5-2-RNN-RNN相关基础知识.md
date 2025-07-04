---
title: 2.RNN相关基础知识
date: 2025-04-17 13:33:10
tags:
    - RNNs
    - Deep_Learning
categories:
    - RNNs
---
# 2. RNN 相关技术

## 1. 潜变量自回归模型与RNN

- RNN用**潜变量 $h_t$ 总结历史信息**，适合处理序列数据。
- **隐藏状态更新公式**：
	$$h_t = \phi(W_{hh} h_{t-1} + W_{hx} x_t + b_h)$$
	- $h_t$：当前时间步的隐藏状态（记忆）  
	- $h_{t-1}$：上一个时间步的隐藏状态（过去的记忆）  
	- $x_t$：当前输入（如词向量）  
	- $W_{hh}, W_{hx}$：可学习的权重矩阵，用于融合历史和当前输入  
	- $b$：偏置项  
	- $\phi$：激活函数（如 tanh 或 ReLU），引入非线性
	- 如果去掉 $W_{hh} h_{t-1}$，RNN就退化成普通的MLP。

- RNN 把过去的记忆 $h_{t-1}$ 和当前输入 $x_t$ 融合，经过变换和激活函数，得到新的记忆 $h_t$。这就是它记住上下文的方式。
		
- **输出层公式**：$o_t = W_{ho} h_t + b_o$
- **训练目标**：用当前词 $x_t$ 和前一状态 $h_{t-1}$ 计算 $h_t$，再预测下一个词 $x_{t+1}$，损失函数比较 $o_t$ 与 $x_{t+1}$ 的差异。
    
## 2. 困惑度（Perplexity）

- 衡量语言模型性能，常用**平均交叉熵**：
$$\pi = -\frac{1}{n} \sum_{i=1}^n \log p(x_i | x_1, ..., x_{i-1})$$
- 通常用 $\exp(\pi)$ 作为困惑度（perplexity）指标，表示模型对下一个词的不确定性，越小越好。
- 完美模型：perplexity = 1
- 越大越差（极端情况趋于无穷大）
        
## 3. 梯度裁剪（Gradient Clipping）

- RNN 反向传播时，长序列会导致梯度爆炸或消失。
- **梯度裁剪**可有效防止梯度爆炸：
$$g \leftarrow \min\left(1, \frac{\theta}{\|g\|}\right) g$$
如果梯度范数超过阈值 $\theta$，则按比例缩放到阈值。(i.e. 当 $|g| > \theta$ 时才裁剪)
    
## 4. RNN常见结构

- One to one：MLP（简化版，单输入单输出）
- One to many：文本生成
- Many to one：文本分类
- Many to many：机器翻译、序列标注、问答等

## 4. 总结

- RNN 能处理序列相关性，其*输出* 由**当前输入**和**历史隐状态**共同决定。
- 语言模型中，RNN根据当前词预测下一个词。
- 困惑度（perplexity）是衡量语言模型效果的关键指标。

## 参考资料
- [李沐《动手学深度学习》：语言模型和数据集](https://zh.d2l.ai/chapter_recurrent-neural-networks/language-models-and-dataset.html)
- [李沐《动手学深度学习》：循环神经网络](https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn.html)
- [Bilibili：语言模型和数据集](https://www.bilibili.com/video/BV1ZX4y1F7K3/)
- [Bilibili：循环神经网络](https://www.bilibili.com/video/BV1D64y1z7CA/)