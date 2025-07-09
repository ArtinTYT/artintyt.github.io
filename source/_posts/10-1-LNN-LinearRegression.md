---
title: 1. Linear Regression
date: 2025-04-22 10:22:40
tags:
    - LNN
    - LinearRegression
    - Regression
    - Deep_Learning
    - Supervised_Learning
categories:
    - LNNs 
---
# 1. Linear Regression 线性回归 （LNN for Regression）


## 1. 线性回归 (线性或非线性)

- **回归 (Regression)**：能为一个或多个自变量与因变量之间关系建模的方法，预测输出是连续值。
- 线性回归是一种用于**预测连续变量**的基本监督学习方法。

- **模型形式**：
	$$\hat{y} = \mathbf{w}^\top \mathbf{x} + b$$

	- $\mathbf{w}$：权重（weights），$b$：偏置/截距（bias/intercept）
	
- **批量样本（矩阵）表示**：
	$$\hat{\mathbf{y}} = X \mathbf{w} + b$$
	- $X$：$n \times d$ 输入矩阵，$n$ 为样本数，$d$ 为特征数。

- **目标**：找到一组参数 $(\mathbf{w}, b)$ 使预测值 $\hat{y}$ 尽可能贴近真实值 $y$。
- **我们需要**：
	1. 一种模型质量的度量方法。
	2. 一种能更新模型以提高模型预测质量的方法。

## 2. 损失函数 (Loss Function)

- **需求**：在去做模型拟合 (fit) 之前，需要确定一种度量—— fit 不 fit。
- **损失函数**：评估模型的好坏，需要度量预测值 $\hat{y}$ 和真实值 $y$ 之间的误差。
- 通常选择非负数作为损失
	- 值越小 = 损失越小
	- 完美预测，损失 = 0
	
- 常用**平方误差损失**（$L_{2}$ loss）：
  $$
  l^{(i)}(w, b) = \frac{1}{2} \left[ \hat{y}^{(i)} - y^{(i)} \right]^2
  $$
	- $l^{(i)}$：第 $i$ 个样本的损失
	- $\frac{1}{2}$ 仅是数学方便，实际影响不大

- **总损失（训练集均值）**：
    $$L(w, b) = \frac{1}{n} \sum_{i=1}^n l^{(i)}(w, b) = \frac{1}{2n} \sum_{i=1}^n \left( \mathbf{w}^\top \mathbf{x}^{(i)} + b - y^{(i)} \right)^2$$
- **目标函数**：最小化训练集上的总损失
    $$w^*, b^* = \arg\min_{w, b} L(w, b)$$

## 3. 解析解 (Analytical Solution)

- 线性回归的损失函数是凸函数，可以直接通过数学推导得到全局最优解（解析解）。
- **线性模型**：$y = wx + b$
- **损失函数**：均方误差 (MSE)
  $$
  L(w, b) = \frac{1}{2n} \| Xw - y \|_2^2
  $$

- 对 $w$ 求导，并令导数为 0 得解析解：
  $$
  w^* = (X^T X)^{-1} X^T y
  $$
- **优点**：
	1. 无需迭代，一步到位。
	2. 保证找到全局最优解。

- **局限性**：当 $d$ 很大或 $X^TX$ 不可逆时不适用；计算复杂度高

## 4. 随机梯度下降 (Stochastic Gradient Descent, SGD)

- **应用**：无法得到解析解时，使用梯度下降 (Gradient Descent)。
- **用法**：
	- 通过不断地在损失函数递减的方向上更新参数来降低误差。
	- 计算损失函数（所有样本的损失均值）关于参数的导数（非常慢）。
- **常用**：小批量随机梯度下降 (Mini-batch SGD)
    - 每次迭代中，先随机随机抽样一个 小批量样本 $B$ （固定数量训练样本）。
    - 然后，计算该 $B$ 的平均损失关于模型参数的导数（即梯度）。
    - 最后，将梯度乘以预先确定的学习率 $\eta$，并从当前参数值中减去。

  - **算法**：
    1. 初始化模型参数的值，如随机初始化；
    2. 从数据集中随机抽取B，并在负梯度的方向上更新参数，不断迭代这一步骤。
    3. 平方损失和**参数更新公式**（对每个小批量 $B$）：
      $$
      \begin{aligned}
      w &\leftarrow  w - \frac{\eta}{|B|} \sum_{i \in B} \left( \mathbf{w}^T \mathbf{x}^{(i)} + b - y^{(i)} \right) \mathbf{x}^{(i)}, \\
      b &\leftarrow b - \frac{\eta}{|B|} \sum_{i \in B} \left( \mathbf{w}^T \mathbf{x}^{(i)} + b - y^{(i)} \right).
      \end{aligned}
      $$
      - $\eta$：学习率（learning rate）
      - $|B|$：批量大小 (Batch Size)

  - **超参数 (Hyperparameter)**：
    - 学习率 $\eta$ 和批量大小 $B$：通常手动预先指定（可以调整，但训练中不会更新）。
    - 超参数：是根据训练迭代结果来调整，而是在独立的验证数据集 (Validation Dataset) 上评估得到。

  - **调参 (Hyperparameter Tuning)**：选择超参数的过程。

  - **泛化 (Generalization)**：复杂的模型包含多个最小损失，找到一组参数可以使得从未见过的数据中实现较低的损失。这一挑战称为泛化。


## 5. 正态分布与平方损失

- **正态分布 (Normal Distribution)**：
  $$
  p(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right).
  $$

- **均方误差损失函数 (MSE)**：假设观测值 $y$ 是线性函数加上正态噪声
    $$y = \mathbf{w}^\top \mathbf{x} + b + \epsilon, \quad \epsilon \sim \mathcal{N}(0, \sigma^2)$$

- 因此，给定输入 $x$，观测到特定 $y$ 的似然 (Likelihood) 为：
    $$P(y|x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(y - \mathbf{w}^\top \mathbf{x} - b)^2}{2\sigma^2}\right)$$
    
- 根据最大似然估计法，$w$ 和 $b$ 的最优值使整个数据集的似然最大化：
  $$
  P(y|X) = \prod_{i=1}^n P(y^{(i)}|x^{(i)}).
  $$

- 优化通常说“最小化”而不是“最大化”。最大化似然等价于最小化均方误差损失：
	$$-\log P(y|X) = \frac{n}{2}\log(2\pi\sigma^2) + \frac{1}{2\sigma^2}\sum_{i=1}^n \left(y^{(i)} - \mathbf{w}^\top \mathbf{x}^{(i)} - b\right)^2$$
	- 忽略第一项（不依赖于 $w, b$），则：最小化均方误差 = 线性模型的最大似然估计


## 6. 总结：

1. **线性回归的基本定义** ：
    - 线性回归是一种对 n 维输入进行加权，并添加偏差的模型。
    - 其目标是通过平方损失函数来最小化预测值与真实值之间的差异。
2. **解析解** ：线性回归具有解析解，可以通过数学推导直接求得全局最优解。
3. **与神经网络的关系** ：线性回归可以被视为一种简单的单层神经网络，其中没有激活函数，仅包含权重和偏差。

## 参考资料

- [李沐《手动深度学习》： 3.1. 线性回归](https://zh.d2l.ai/chapter_linear-networks/linear-regression.html)
- [Bilibili：线性回归](https://www.bilibili.com/video/BV1PX4y1g7KC)
