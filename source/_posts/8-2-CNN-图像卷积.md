---
title: 2.图像卷积
date: 2025-04-18 15:55:10
tags:
    - CNN
    - Deep_Learning
    - Image
    - Convolution
    - AI
categories:
    - CNNs
---
# 2. 图像卷积

## 1. **卷积运算 → 互相关运算 (cross-correlation)**

- **二维互相关**：
	- **定义**：将输入和核矩阵进行交叉相乘，加上偏移后得到输出。
	- **示例**：<img src="/images/img/img_cross1.png" width=370 style="display: block; margin: 0 auto;"/>

## 2. **输入输出尺寸**

- **输入** $X$：大小为 $n_h \times n_w$（超参数）。
- **核 (kernel)** $W$：大小为 $k_h \times k_w$。
- **偏置** $b \in \mathbb{R}$。
- **输出** $Y$：大小为 $(n_h - k_h + 1) \times (n_w - k_w + 1)$。
	- **原因**：核滑动时，边缘位置无法完全覆盖输入，导致输出尺寸缩小。
	<img src="/images/img/img_cross2.png" width=120 style="display: block; margin: 0 auto;"/>
	- 如图，扫到这里没了，所以不输出，导致丢掉一些数据，就是$(-k_h +1)$ 和 $(-k_w+1)$ 就会导致一下结果，图片变模糊
		 <img src="/images/img/img_cross3.png" width=450 style="display: block; margin: 0 auto;"/>
- **公式**：$Y = X * W + b$，其中 $W$ 和 $b$ 是可学习参数。

## 3. **互相关 vs. 卷积**

- **互相关**：
    $$y_{i,j} = \sum_{a=1}^{k_h} \sum_{b=1}^{k_w} W_{a,b} \cdot X_{i+a, j+b}$$

- **卷积**：
    $$y_{i,j} = \sum_{a=1}^{k_h} \sum_{b=1}^{k_w} W_{k_h-a+1, k_w-b+1} \cdot X_{i+a, j+b}$$

- **区别**：卷积需要对核做180°翻转。对于对称核（如高斯核），两者结果相同。深度学习中通常采用互相关实现。

## 4. 一维与三维互相关

- **一维互相关**（如文本/时间序列）：
    $$y_i = \sum_{a=1}^k W_a \cdot X_{i+a}$$

- **三维互相关**（如视频、医学影像）：
    $$y_{i,j,k} = \sum_{a=1}^{k_h} \sum_{b=1}^{k_w} \sum_{c=1}^{k_d} W_{a,b,c} \cdot X_{i+a, j+b, k+c}$$

## 5. **总结**
- 核心思想：通过滑动小尺寸核，对输入局部区域加权求和，实现特征提取与参数量压缩。
- 关键参数：核大小、步长、填充（padding）。

## 参考资料

- [动手学深度学习 6.2：图像卷积层](https://zh.d2l.ai/chapter_convolutional-neural-networks/conv-layer.html)
- [Bilibili：图像卷积](https://www.bilibili.com/video/BV1L64y1m7Nh?p=2)


