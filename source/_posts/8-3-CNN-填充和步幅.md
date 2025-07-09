---
title: 3.填充和步幅（padding & stride）
date: 2025-04-18 17:13:10
tags:
	- CNN
	- Padding
	- Stride
	- Deep_Learning
	- AI
categories:
    - CNNs
---

# 3. 填充和步幅（Padding & Stride）

### 1.填充（Padding）

- 给定 $32 \times 32$ 的输入图像，应用 $5 \times 5$ 卷积核：
    - 第1层输出大小为 $28 \times 28$
    - 第7层输出大小为 $4 \times 4$
- **更大的卷积核**会让输出尺寸更快减小
	- 形状从 $n_h \times n_w$ 减少到 $(n_h - k_h + 1) \times (n_w - k_w + 1)$
	- 其中 $n_h, n_w$ 是输入的高和宽，$k_h, k_w$ 是卷积核的高和宽。
- 在输入周围添加格外的行/列，让输入变得更大
	 <img src="/images/img/img_padding1.png" width=600 style="display: block; margin: 0 auto;"/>
- **引入填充**：在输入图像四周补零，使输出形状减小得更慢。
	- 填充 $p_h$ 行和 $p_w$ 列，输出形状为：
	    $$(n_h - k_h + p_h + 1) \times (n_w - k_w + p_w + 1)$$
	- 通常取 $p_h = k_h - 1, \ p_w = k_w - 1$
		- 若 $k_h$ 为奇数：上下两侧各填充 $p_h/2$
		- 若 $k_h$ 为偶数：上侧填充 $\lfloor p_h/2 \rfloor$，下侧填充 $\lceil p_h/2 \rceil$
		- 列同理

## 2.步幅（Stride）

- 步幅（stride）是指每次滑动卷积核时，行/列方向的步长。
- 步幅的引入可以让输出尺寸**按比例减小**，更快缩小特征图大小。
    - 例：步幅为$(3,2)$表示每次在高方向移动3格，宽方向移动2格。
	    <img src="/images/img/img_padding2.png" width=300 style="display: block; margin: 0 auto;"/>
- 步幅公式
	- 设高度步幅为 $s_h$，宽度步幅为 $s_w$，则输出形状为：
		$$\left\lfloor \frac{n_h - k_h + p_h + s_h}{s_h} \right\rfloor \times \left\lfloor \frac{n_w - k_w + p_w + s_w}{s_w} \right\rfloor$$
	- 当 $p_h = k_h - 1$，$p_w = k_w - 1$ 时，输出形状为：
		$$\left\lfloor \frac{n_h + s_h - 1}{s_h} \right\rfloor \times \left\lfloor \frac{n_w + s_w - 1}{s_w} \right\rfloor$$
	- 若输入尺寸能被步幅整除，输出为：
		$$(n_h / s_h) \times (n_w / s_w)$$


## 3.总结

- **填充**和**步幅**是卷积层控制输出形状的两个重要超参数。
- 填充通过在输入四周补零，减缓输出形状的缩减。
- 步幅决定每次卷积核移动的距离，可成倍压缩输出尺寸，加速下采样。
- 合理设置二者，有助于灵活控制模型的空间结构和计算量。

## 参考资料

- [李沐《动手学深度学习》：填充和步幅](https://zh.d2l.ai/chapter_convolutional-neural-networks/padding-and-strides.html)
- [Bilibili：填充和步幅](https://www.bilibili.com/video/BV1Th411U7UN)

