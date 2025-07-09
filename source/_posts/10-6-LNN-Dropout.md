---
title: 6. Dropout（丢弃法）
date: 2025-04-22 18:12:30
tags:
    - LNN
    - Dropout
    - Regularization
    - Deep_Learning
    - Supervised_Learning
categories:
    - LNNs 
---

# 6.  Dropout（丢弃法）

- **动机**
	- 一个好的模型需要对输入数据有**抗扰动鲁棒性**。
	- 使用带噪声的数据等价于Tikhonov正则（L2正则），是一种正则化手段。
	- Dropout的本质：**在神经网络的层与层之间随机加入噪声**。

- **Dropout的实现方式** 
	- 对输入 $\mathbf{x}$ 加噪声得到 $\mathbf{x}'$，要求 $\mathbb{E}[\mathbf{x}'] = \mathbf{x}$，保证无偏性。
	- Dropout对每个元素进行如下扰动（丢弃概率$p$）：
$$x_i' = \begin{cases} 0, & \text{with probability } p \\
\dfrac{x_i}{1-p}, & \text{otherwise} \end{cases}
$$
- **Dropout的应用**
	- 通常将Dropout用在多层感知机（MLP）的隐藏层输出上。
	- 前向传播流程：
$$
\begin{align*} \\
\mathbf{h} &= \sigma(\mathbf{W}_1\mathbf{x} + \mathbf{b}_1) \\ \mathbf{h}' &= \text{dropout}(\mathbf{h}) \\ \mathbf{o} &= \mathbf{W}_2\mathbf{h}' + \mathbf{b}_2 \\ \mathbf{y} &= \text{softmax}(\mathbf{o}) \\
\end{align*}
$$

<img src="/images/img/img_LNN-dropout.png" width=400 style="display: block; margin: 0 auto;"/>

- **推理/预测时的Dropout**
	- **正则项只在训练时起作用**，推理阶段不用丢弃，而是直接返回输入（保证输出确定性）。
	- 预测时：$\mathbf{h} = \text{dropout}(\mathbf{h})$ 实际上就是$\mathbf{h}$本身。

- **总结**
	- Dropout将一些输出项随机置0，以**抑制模型复杂度**，防止过拟合。
	- 多用于神经网络的隐藏层。
	- 丢弃概率$p$是**控制模型复杂度的超参数**，一般要通过验证集调优。


> 记住，Dropout不是随便用的，每层、每种任务的 $p$ 一般都要调参。训练和推理阶段Dropout行为不同，这点别混了！




## 参考资料

- [Bilibili：dropout](https://www.bilibili.com/video/BV1Y5411c7aY)
- [李沐《手动深度学习》：dropout](https://zh.d2l.ai/chapter_multilayer-perceptrons/dropout.html)

