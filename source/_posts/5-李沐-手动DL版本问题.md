---
title: 李沐《手动深度学习》环境配置
date: 2025-04-16 19:11:33
tags:
  - DL
  - Error

categories:
  - Deep Learning
---

包括安装步骤、踩坑提示、适配d2l版本说明，适合写给想要在本地用 Jupyter Notebook 或者 PyCharm 学习这本书的朋友。


## 使用的环境配置（推荐）

| 组件 | 版本 |
|------|------|
| Python | 3.8 |
| d2l | 0.17.6 |
| torch | 1.13+ |
| pandas | >=1.2.4 |
| jupyter notebook | 看情况安装 |

版本过高，会导致一系列效果无法呈现的问题。


## 一、创建 Conda 虚拟环境

推荐使用 Conda 来管理环境，避免依赖冲突。首先创建一个 Python 3.8 的新环境：

```bash
conda create -n d2l-py38 python=3.8
conda activate d2l-py38
```


## 二、安装 d2l 与依赖

我们使用的是 `d2l==0.17.6` 版本，这是与《动手学深度学习（PyTorch）》最兼容的版本：

```bash
conda install -c conda-forge d2l=0.17.6
```

安装其他依赖：

```bash
pip install torch torchvision matplotlib pandas jupyter
```


## 三、测试示例代码是否正常运行

打开 Jupyter：

```bash
jupyter notebook
```

我们使用的是 PyCharm 中集成的 notebook。


## 四、常见错误与解决方案

### 🐛 1. `AttributeError: module 'd2l.torch' has no attribute 'train_ch3'`

说明你装的是 `d2l` 新版本（比如 `0.17.7` 以后），该版本移除了一些旧函数。解决方法：

✅ **回退到 0.17.6**：

```bash
pip install d2l==0.17.6
```


### 🐛 2. Conda 报错 `pandas 1.2.4 requires python<3.10`

这是因为 `d2l==0.17.6` 依赖老版本 pandas（如 1.2.4），而 pandas 不兼容 Python 3.10。解决方法：

✅ 使用 Python 3.8 或 3.9 创建环境。


## 五、删除不需要的 Conda 环境（可选）

查看所有环境：

```bash
conda env list
```

删除指定环境（比如 d2l-py310）：

```bash
conda deactivate
conda env remove -n d2l-py310
```


## 参考资料

- [Bilibili 视频讲解：安装](https://www.bilibili.com/video/BV18p4y1h7Dr/)




