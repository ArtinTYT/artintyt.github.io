---
title: 5. Positional Encoding 位置编码
date: 2025-04-19 15:55:19
tags:
  - Position_Encoding
  - NLP
  - Deep_Learning
  - Transformer
  - AI

categories:
    - Attention
---
# 5. Positional Encoding 位置编码

## 1. 动机

1. **为什么要加位置编码？**
	- Self-Attention 本身不感知输入顺序，把序列当成无序集合（Set），缺乏序列（Sequence）信息。
	- 必须人为注入"位置信息"，让模型知道"顺序" （Transformer需要）。

2. **和其他架构对比：**
	- CNN 通过卷积核隐式捕捉局部顺序
	- RNN 按时间步显式感知顺序
	- Transformer 完全依赖位置编码来感知顺序

## 2. 位置编码的实现

- **基本方法**：
	- 给长度为 $n$、维度为 $d$ 的输入 $X \in \mathbb{R}^{n \times d}$，为每个位置 $i$ 添加一个位置向量（位置信息） $P_i$，构成位置编码矩阵 $P \in \mathbb{R}^{n \times d}$，输入变为 $X + P$，从而加入位置信息。。

- **位置编码矩阵 $P$**（正弦-余弦编码）：
  $$
  P_{i,2j} = \sin\left(\frac{i}{10000^{2j/d}}\right), \quad P_{i,2j+1} = \cos\left(\frac{i}{10000^{2j/d}}\right)
  $$
	- $i$：位置索引
	- $j$：维度索引的一半
	- $d$：总维度
		<img src="/images/img/img_posional.png" width=400 style="display: block; margin: 0 auto;"/>

- **绝对位置信息**：计算机的二进制编码
- **相对位置信息**：
	- 有编码的频率参数 $w_j = 1/10000^{2j/d}$ ，那么，
		- $P_{i,2j}, P_{i,2j+1}$：第$i$个位置的编码的两个分量
		- $P_{i+\delta,2j}, P_{i+\delta,2j+1}$：第$i+\delta$个位置的编码分量

		- $\delta$：两个位置之间的距离（如$\delta=1$就是前后相邻）
		- 这个旋转矩阵（只跟$\delta$和$w_j$有关）可以把位置 $i$ 的编码**线性投影**到任意位置 $i+\delta$，方便模型计算和理解**相对位置信息**。
$$
\begin{aligned}
&\begin{bmatrix}
\cos(\delta w_j) & \sin(\delta w_j) \\
-\sin(\delta w_j) & \cos(\delta w_j)
\end{bmatrix}
\begin{bmatrix}
P_{i,2j} \\
P_{i,2j+1}
\end{bmatrix} =
\begin{bmatrix}
P_{i+\delta ,2j} \\
P_{i+\delta ,2j+1}
\end{bmatrix}
\end{aligned}
$$



## 3. 例子：英汉翻译任务中的位置编码

1. **英汉翻译任务中的位置编码**
	1. 例如句子"你好吗？"，首先会进入**词向量层**，被转为 $4 \times 4$ 的词向量矩阵。  
		<img src="/images/img/img_positionEncoding1.png" width=500 style="display: block; margin: 0 auto;"/>
	2. 然后进行**位置编码**，将位置信息加到原始词向量上。  
		<img src="/images/img/img_positionEncoding2.png" width=450 style="display: block; margin: 0 auto;"/>
	3. 具体地，用正弦和余弦公式，生成一个 $4 \times 4$ 的位置编码矩阵。  
		<img src="/images/img/img_positionEncoding3.png" width=500 style="display: block; margin: 0 auto;"/>
	4. 将每个词的词向量与对应位置编码直接相加，得到新的输入特征。
    

2. **原理说明**：
	1. 为什么直接加位置编码不会破坏词向量信息？
		- 训练数据充足，几乎所有"词+位置"组合模型都能见到并学习。
		- 神经网络足够深、参数足够多，能有效区分并利用"词向量+位置编码"的复杂特征。
        
	2. 这种方法极大丰富了输入特征空间。例如：有3个词语（$\mathbf{a}$, $\mathbf{b}$, $\mathbf{c}$）和3个位置编码（$\mathbf{x}$, $\mathbf{y}$, $\mathbf{z}$），每个词都可以和3个位置组合，得到9种独特的新表示：
	    - **词语向量**
			- $\mathbf{a} = [a_1, a_2, a_3, a_4]$
			- $\mathbf{b} = [b_1, b_2, b_3, b_4]$
			- $\mathbf{c} = [c_1, c_2, c_3, c_4]$
		- **位置编码向量**
			- $\mathbf{x} = [x_1, x_2, x_3, x_4]$
			- $\mathbf{y} = [y_1, y_2, y_3, y_4]$
			- $\mathbf{z} = [z_1, z_2, z_3, z_4]$
	    - 词 $\mathbf{a}$ 的组合：$\mathbf{a} + \mathbf{x}$，$\mathbf{a} + \mathbf{y}$，$\mathbf{a} + \mathbf{z}$
	    - 词 $\mathbf{b}$ 的组合：$\mathbf{b} + \mathbf{x}$，$\mathbf{b} + \mathbf{y}$，$\mathbf{b} + \mathbf{z}$
	    - 词 $\mathbf{c}$ 的组合：$\mathbf{c} + \mathbf{x}$，$\mathbf{c} + \mathbf{y}$，$\mathbf{c} + \mathbf{z}$
    
	3. 有一种特殊情况，在数学上称为"碰撞"， 不同的词向量和位置编码组合结果，恰好是同一个向量表示（如$\mathbf{a}+\mathbf{x} = \mathbf{b}+\mathbf{y}$）。 这种情况出现时，会使训练数据产生歧义，但是由在高纬度空间，$w=[w_1,...,w_n]\text{，}n=512$ 即使某个维度出现"碰撞"，对整个维度来说几乎没有影响。

## 4. 总结

- **Self-Attention 层**：
	- 将 $X$ 当作 Key、Value、Query 来对序列抽取特征。
	- 完全并行，但对长序列计算复杂度高。
- **位置编码的作用**：
	- 在输入中加入位置信息，使得 Self-Attention 能记忆位置信息。


## 参考

[李沐《手动深度学习》：自注意力和位置编码](https://zh.d2l.ai/chapter_attention-mechanisms/self-attention-and-positional-encoding.html)
[Bilibili：自注意力和位置编码](https://www.bilibili.com/video/BV19o4y1m7mo/)
[YouTube：如何理解Transformer的位置编码，PositionalEncoding详解](https://www.youtube.com/watch?v=7Pod6151eIk)
