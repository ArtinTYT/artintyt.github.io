---
title: 4.多输入通道与多输出通道的卷积
date: 2025-04-18 19:19:10
tags:
    - Deep_Learning
    - CNNs
categories:
    - CNNs
---

# 4. 多输入通道与多输出通道的卷积

## 1. 多输入通道

- 彩色图像一般有 RGB 三个输入通道，直接转成灰度会丢失信息。
	<img src="/images/img/img_channel1.png" width=400 style="display: block; margin: 0 auto;"/>
- **每个输入通道**都有一个对应的卷积核，所有通道卷积后的结果**相加**，得到单通道的输出。
	<img src="/images/img/img_channel2.png" width=400 style="display: block; margin: 0 auto;"/>
- 数学形式：
    - 输入 $\mathbf{X}$：$c_i \times n_h \times n_w$
    - 卷积核 $\mathbf{W}$：$c_i \times k_h \times k_w$
    - 输出 $\mathbf{Y}$：$m_h \times m_w$
    - 公式：$\mathbf{Y} = \sum_{i=1}^{c_i} \mathbf{X}_{i,:,:} \star \mathbf{W}_{i,:,:}$
        

## 2. 多输出通道

- 卷积层的**输出通道数**是一个超参数。
- 可以有多个三维卷积核，每个核生成一个输出通道。
- 数学形式：
    - 输入 $\mathbf{X}$：$c_i \times n_h \times n_w$
    - 核 $\mathbf{W}$：$c_o \times c_i \times k_h \times k_w$
    - 输出 $\mathbf{Y}$：$c_o \times m_h \times m_w$
    - 公式：$\mathbf{Y}_{i,:,:} = \mathbf{X} \star \mathbf{W}_{i,:,:,:}$，for $i = 1, ..., c_o$

## 3. 多输入和多输出

- 每个输出通道可以识别特定模式
- 输入通道核识别并组合输入中的模式
    

## 4. 1x1 卷积层

- $k_h = k_w = 1$ 的是一个受欢迎的选择，它不提识别空间模式，仅用于**通道融合**。
	<img src="/images/img/img_channel3.png" width=300 style="display: block; margin: 0 auto;"/>
- 等价于输入为 $n_h n_w \times c_i$，权重为 $c_o \times c_i$ 的全连接层。
    

## 5. 二维卷积层计算复杂度

- 输入 $\mathbf{X}$：$c_i \times n_h \times n_w$
- 核 $\mathbf{W}$：$c_o \times c_i \times k_h \times k_w$
- 偏置 $\mathbf{B}$：$c_o$
- 输出 $\mathbf{Y}$：$c_o \times m_h \times m_w$
- 计算复杂度（浮点计算数FLOP）：$O(c_i c_o k_h k_w m_h m_w)$
	- $c_i=c_o=100$
	- $k_h=h_w=50$
	- $m_h=m_w=64$
- ==> 1GFLOP
- (CPU: 0.15. TF = 18h, GPU: 12 TF = 14min)
    

## 6. 总结

- **输出通道数**是卷积层的超参数，决定输出特征的"宽度"。
- 每个输入通道有独立的卷积核，卷积结果相加后再送给每个输出通道。
- 每个输出通道有独立的三维卷积核，分别负责识别特定模式或组合输入通道特征。
- $1 \times 1$ 卷积可用于通道混合，不提取空间特征。
- 二维卷积层的计算复杂度与通道数、卷积核大小和输出尺寸成正比。



## 参考资料

- [李沐《动手学深度学习》：多 输入/输出 通道](https://zh.d2l.ai/chapter_convolutional-neural-networks/channels.html)
- [Bilibili：多 输入/输出 通道](https://www.bilibili.com/video/BV1MB4y1F7of)

