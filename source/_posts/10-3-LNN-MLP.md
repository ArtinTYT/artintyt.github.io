---
title: 3. Multilayer Perceptron（MLP）
date: 2025-04-22 15:22:30
tags:
    - LNN
    - MLP
    - NeuralNetwork
    - Deep_Learning
    - Supervised_Learning
categories:
    - LNNs 
---

# 3. Multilayer Perceptron 多层感知机


## 1. 感知机（Perceptron）

- **感知机模型**
	- 感知机是最早的神经网络模型之一，用于二分类问题。
	- 给定输入 $\mathbf{x}$，权重 $\mathbf{w}$ 和偏置 $b$，感知机的输出为：
	    $$o = \sigma(\langle \mathbf{w}, \mathbf{x} \rangle + b)$$
	    
	    - 其中，激活函数 $\sigma(x)$ 定义为：
		    $$\sigma(x) = \begin{cases} 1 & x > 0 \\ 0 \text{ 或 } -1 & \text{otherwise} \end{cases}$$
	    - 常见二分类标签取 ${1, -1}$ 或 ${1, 0}$
	- 模型结构如图，所有输入特征 $x_1, x_2, ..., x_d$ 线性加权后加偏置，经符号函数输出 $o_1$。

	<img src="/images/img/img_LNN1.png" width=250 style="display: block; margin: 0 auto;"/>
    
- **感知机训练算法**
	```
	初始化：w = 0，b = 0
	迭代训练：
		repeat
			if y_i (⟨w, x_i⟩ + b) ≤ 0:
				w ← w + y_i x_i
				b ← b + y_i
	until 全部样本分类正确
	```

	- 这个过程等价于**批量大小为1的梯度下降**，损失函数为：
	    $$\ell(y, \mathbf{x}, \mathbf{w}) = \max(0, -y \langle \mathbf{w}, \mathbf{x} \rangle)$$

- **感知机收敛性定理**
	- 如果数据在半径 $r$ 的范围内，且能以余量 $\rho$ 正确线性分开，则感知机满足：
		$$y (\mathbf{x}^T \mathbf{w} + b) \geq \rho$$
	- 对于 $|\mathbf{w}|^2 + b^2 \leq 1$，感知机保证在 $\frac{r^2 + 1}{\rho^2}$ 步内收敛（即有限步数内找到可行解）。
		
	<img src="/images/img/img_perceptron2.png" width=200 style="display: block; margin: 0 auto;"/>
	<img src="/images/img/img_perceptron3.png" width=200 style="display: block; margin: 0 auto;"/>
	<img src="/images/img/img_perceptron4.png" width=200 style="display: block; margin: 0 auto;"/>

	    

- **感知机的局限性（XOR问题）**
	- 感知机**只能处理线性可分问题**，无法拟合异或（XOR）等非线性可分函数。（即，不管怎么切，都无法正确分类）
	- 这也是 Minsky & Papert（1969）提出的著名反例，导致早期AI寒冬。
	<img src="/images/img/img_softmax-percetion.png" width=120 style="display: block; margin: 0 auto;"/>


## 2. 多层感知机（MLP, Multi-Layer Perceptron）

- **为什么需要多层感知机**
	- 单层感知机只能处理线性可分问题，**无法拟合XOR等非线性问题**。
	- **多层感知机（MLP）** 通过引入 **隐藏层** 和 **非线性激活函数**，可以表达复杂的非线性关系，实现对XOR等复杂模式的拟合。
	<img src="/images/img/img_perceptron5.png" width=400 style="display: block; margin: 0 auto;"/>
	
    

- **多层感知机结构**
	- **基本结构：输入层 → 隐藏层（1层或多层）→ 输出层**
	- 每层之间全连接（fully connected）
    

- **单隐层MLP（单输出）**  
	- 输入：$\mathbf{x} \in \mathbb{R}^n$
	- 隐藏层：$\mathbf{W}_1 \in \mathbb{R}^{m \times n}$，$\mathbf{b}_1 \in \mathbb{R}^m$
	- 输出层：$\mathbf{w}_2 \in \mathbb{R}^m$，$b_2 \in \mathbb{R}$
	- 计算过程：  
$$
\begin{aligned}
\mathbf{h} &= \sigma(\mathbf{W}_1\mathbf{x} + \mathbf{b}_1) \\
o &= \mathbf{w}_2^\top \mathbf{h} + b_2
\end{aligned}$$

<img src="/images/img/img_perceptron6.png" width=250 style="display: block; margin: 0 auto;"/>

- **多类分类MLP**
	- 输出层通常有$k$个节点，最后用softmax归一化：$\mathbf{y} = \mathrm{softmax}(o_1, o_2, ..., o_k)$
	- 输出层参数：$\mathbf{W}_2 \in \mathbb{R}^{m \times k}$，$\mathbf{b}_2 \in \mathbb{R}^k$
- **多隐层MLP**
	- 每一层的输出作为下一层输入，公式类比上面，每层参数都可独立设置。

	<img src="/images/img/img_perceptron7.png" width=400 style="display: block; margin: 0 auto;"/>

- **常用激活函数**
	- **Sigmoid**：$\sigma(x) = \frac{1}{1 + \exp(-x)}$，输出范围 (0,1)

	<img src="/images/img/img_perceptron8.png" width=250 style="display: block; margin: 0 auto;"/>

	- **Tanh**：$\tanh(x) = \frac{1 - \exp(-2x)}{1 + \exp(-2x)}$，输出范围 (-1,1)

	<img src="/images/img/img_perceptron9.png" width=250 style="display: block; margin: 0 auto;"/>

	- **ReLU**：$\mathrm{ReLU}(x) = \max(0, x)$

	<img src="/images/img/img_perceptron10.png" width=240 style="display: block; margin: 0 auto;"/>

- **超参数**
	- **隐含层数**：网络有几层隐藏层
	- **每层隐藏单元数**：每层神经元的个数


## 5. 总结

- 感知机是最基础的二分类模型之一，属于早期AI历史上划时代的工作。
- 算法本质是逐步调整权重和偏置，直到所有样本正确分类（线性可分）。
- **不能拟合XOR等非线性问题**，这点极其重要，也是深度学习为何需要多层结构的直接动机。
- **多层感知机利用隐藏层和激活函数获得非线性建模能力，突破单层感知机的线性限制**
- **常用激活函数**：Sigmoid、Tanh、ReLU
- **多类分类问题**：通常在输出层使用Softmax
- **主要超参数**：隐藏层数量、每层大小


## 参考资料

- [李沐《手动深度学习》： 4.1多层感知机](https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html)
- [Bilibili：多层感知机](https://www.bilibili.com/video/BV1hh411U7gn?p=2)
- [Bilibili：感知机](https://www.bilibili.com/video/BV1hh411U7gn)

