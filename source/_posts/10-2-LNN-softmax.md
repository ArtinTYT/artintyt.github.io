---
title: 2. Softmax 回归
date: 2025-04-22 13:12:30
tags:
    - LNN
    - Softmax
    - Classification
    - Deep_Learning
    - Supervised_Learning
categories:
    - LNNs 
---


# 2. Softmax 回归 (LLN for Classification)

## 1. Softmax 回归与分类问题

- **Softmax 回归**：是一种用于**多类别分类**的线性模型。输出层是每个类别的得分（logits），通过 softmax 函数变成概率分布。

- **回归 vs. 分类**
	- **回归**：预测连续值，输出是实数域 $\mathbb{R}$。

    <img src="/images/img/img_LNN1.png" width=250 style="display: block; margin: 0 auto;"/>

	- **分类**：预测离散标签，输出为各类别的概率或置信度。

    <img src="/images/img/img_LNN2.png" width=250 style="display: block; margin: 0 auto;"/>
    
- **多类别分类建模流程**：
	- 对类别进行一位有效编码（one-hot encoding）：$y = [y_1, y_2, \dots, y_n]^T$ 其中：
        $$
        y_i =
        \begin{cases}
        1 & \text{if } i = y \\
        0 & \text{otherwise}
        \end{cases}
        $$
	- 输出原始分数（logits）：$o = [o_1, o_2, ..., o_n]$
	- 预测类别：$\hat{y} = \arg\max_i o_i$
	- 使用Softmax函数将logits转为概率分布：
        $$\hat{y}_i = \frac{\exp(o_i)}{\sum_{k}\exp(o_k)}$$
- **类别区分的本质**：
    - 分类模型需保证正确类别的得分高于其他类别，可以用如 $o_y - o_i \geq \Delta(y,i)$ 这样的条件提升鲁棒性（了解即可，主流做法还是用Softmax+交叉熵）。

1. **目标** ：
    - 在分类任务中，模型需要能够明确区分正确的类别和其他类别，确保预测结果具有较高的置信度。
    - 这种区分能力可以通过增加“真正的类”与其他类之间的得分差距来实现。
2. **无检验比例** ：
    - $o_y​−o_i​\geq \Delta (y,i)$ 表示在输出层上，正确类 $y$ 的得分 $o_y$​ 应该比其他类 $i$ 的得分 $o_i$​ 至少高出一个预设的阈值 $\Delta(y,i)$。这有助于提高分类的鲁棒性和准确性。
3. **有检验比例** ：
    - 使用 **Softmax 函数** 将模型的原始输出 $o$ 转换为概率分布 $y$​ ，确保所有类别的概率非负且总和为 1。



## 2. Softmax 和交叉熵损失

- **Softmax函数** 保证输出为概率分布（非负，总和为1）。
- **交叉熵损失（Cross-Entropy Loss）** 常用于衡量真实分布 $p$ 与预测分布 $q$ 的差异：
    $$H(p, q) = -\sum_i p_i \log q_i$$
    - 对于独热标签$y$，损失可写为：
    $$l(y, \hat{y}) = -\sum_i y_i \log \hat{y}_i = -\log \hat{y}_{y}$$​
- **交叉熵梯度**（对logits的导数）：
    $$\frac{\partial l}{\partial o_i} = \hat{y}_i - y_i$$​
- **one-hot编码说明**：
    - 独热编码向量长度等于类别数，只有一个元素为1，其余为0。
    - 例：三分类时，$y$ 可能为 $(1,0,0), (0,1,0), (0,0,1)$
        
- **仿射函数（Affine function）**：
    $$f(x) = Ax + b$$
    - $A$：权重矩阵（线性变换）
    - $b$：偏置（平移项）



## 3. 常见损失函数对比（回归用）

- **均方误差（MSE）**：
  $$
  L_{\text{MSE}}(y, y') = \frac{1}{2} (y - y')^2
  $$

<img src="/images/img/img_softmax-MSE.png" width=250 style="display: block; margin: 0 auto;"/>
	
- **绝对值损失（MAE）**：
  $$
  L_{\text{MAE}}(y, y') = |y - y'|
  $$
<img src="/images/img/img_softmax-MAE.png" width=250 style="display: block; margin: 0 auto;"/>

- **Huber 损失（Robust loss）**：
  $$
  L_{\text{Huber}}(y, y') =
  \begin{cases}
  \frac{1}{2} (y - y')^2 & \text{if } |y - y'| \leq \delta \\
  \delta |y - y'| - \frac{1}{2} \delta^2 & \text{otherwise}
  \end{cases}
  $$

<img src="/images/img/img_softmax-Huber.png" width=250 style="display: block; margin: 0 auto;"/>

## 4. 总结

- **Softmax回归是多类分类的线性模型**，输出通过Softmax归一化为概率分布。
- **核心损失为交叉熵**，反映模型预测分布与真实标签分布的距离。
- **one-hot编码**是分类任务常用标签表示方式。
- **Softmax输出**让所有类别概率加和为1，适合分类场景。


## 参考资料

- [李沐《手动深度学习》：3.4. softmax回归](https://zh.d2l.ai/chapter_linear-networks/softmax-regression.html)
- [Bilibili：Softmax回归](https://www.bilibili.com/video/BV1K64y1Q7wu)
- [Bilibili：损失函数](https://www.bilibili.com/video/BV1K64y1Q7wu?p=2)

