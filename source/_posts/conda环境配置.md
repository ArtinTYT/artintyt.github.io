---
title: conda环境配置
date: 2025-01-24 19:10:48
tags:
  - conda
  - MacOS

categories:
  - 大模型

---
以下步骤基于 MacOS 系统（MacBookAir M2），如果是 Windows 系统，命令会不同。


## 官网下载安装

下载mini conda：https://www.anaconda.com/download/success


### 安装完成后测试

使用以下命令查看版本和测试安装是否成功：
```bash
conda --verison
```

Terminal显示如下状态：
```BASH
conda 24.11.1
```

### 验证Base环境
Conda 的 (base) 表示你已经激活了默认环境。如果想查看安装的环境列表，可以运行：
```bash
conda env list
```
可能会看到下面的内容：
```bash
# conda environments:
#
base                 * /opt/miniconda3
```

### 查看默认Python版本
查看 conda 默认的 Python 版本，后面会创建指定 Python 某版本的环境。
```bash
python --version
```
可能看到（默认的，可能新 Conda 环境不会使用）：
```BASH
Python 3.12.8
```


## Conda常用命令
```bash
conda –help # 查看帮助
conda info # 查看 conda 信息
conda version  # 查看 conda 版本
conda update conda  # 更新Conda（慎用）
conda clean –all # 清理不再需要的包
conda <指令> help # 查看某一个指令的详细帮助
conda config show #查看 conda 的环境配置
conda clean -p  # 清理没有用，没有安装的包
conda clean -t  # 清理 tarball
conda clean all  # 清理所有包和 conda 的缓存文件
```

## 环境管理

### 查看 Conda 环境路径是否正确设置
通过一下命令查看环境设置：
```BASH
conda config --show
```
可能会看到你的环境存储路径如下：
>1.	/opt/miniconda3/envs（默认路径，位于 Miniconda 安装目录）
>2.	/Users/username/.conda/envs（用户目录下的备用路径）
>
>这些路径是 Conda 的默认配置，如果你对存储位置没有特别要求，无需修改 `envs_dirs`。


### envs_dirs是什么？
在 Conda 中，`envs` 是用来存储 虚拟环境（environments） 的目录。虚拟环境是一个独立的 Python 运行环境，包含特定的 Python 版本以及该环境所需的库和依赖。

#### 什么是 Conda 环境？

Conda 环境是一种隔离机制，用于防止不同项目之间的库和依赖冲突。每个环境都可以有自己的：
- Python 版本（例如 `Python 3.8` 或 `Python 3.12`）。
- 库版本（例如 `NumPy 1.20` 和 `NumPy 1.25` 可以在不同环境中共存）。
- 配置和依赖。

#### envs 是做什么的？

Conda 使用 `envs` 目录来存储所有的虚拟环境。默认情况下：
- 主环境 (base) 会存储在 Conda 的安装目录（例如 `/opt/miniconda3` 或 `/opt/anaconda3`）。
- 其他环境 会存储在 `envs` 文件夹中。例如：
	```bash
	# 默认路径下，`envs` 的位置
	/opt/miniconda3/envs/
	```
	每个虚拟环境都会有一个独立的子目录。例如，如果你创建了名为 myenv 的环境，它可能位于：
	```bash
	/opt/miniconda3/envs/myenv/
	```

#### 为什么需要 Conda 环境？

以下是使用 Conda 环境的几个关键优势：
1. 避免冲突：不同项目可能需要不同的 Python 和库版本，环境隔离可以避免这些冲突。
2. 提高灵活性：可以根据需求快速切换环境。
3. 可移植性：可以轻松导出和导入环境（通过 `.yml` 文件）。
4. 安全性：在独立环境中安装和测试库，不会影响系统全局配置。


### 如何管理 Conda 环境？

#### 1. 查看现有 Conda 环境

```bash
conda env list
```

#### 2. 创建新环境
使用 conda 可以创建相互隔离的 Python 环境，命令如下：

```bash
# 语法
conda create name <env_name> python=<version> [package_name1]
[package_name2] [...]

# 样例 创建一个名为 learn 的环境，python 版本为3.10是3.10.XX最新的版本。
conda create name modelscope python=3.10 
# name 可以简写为 -n
```

通过 `conda env list` 查看刚刚创建的环境如下：

```bash

# conda environments:
#
base                 * /opt/miniconda3
modelscope             /opt/miniconda3/envs/modelscope
```

可以看到有一个新的环境叫 `modelscope`。

#### 3. 激活(切换)环境

```bash
conda activate modelscope
```

#### 4. 退出环境

```bash
conda deactivate
```

#### 5. 删除环境
```bash
# 语法：conda remove --name <conda name> --all

conda remove --name modelscope --all
```

#### 6. 克隆环境
```bash
# 语法：conda create --name <NEW_ENV_NAME> --clone <OLD_ENV_NAME>

conda create --name NEWclone --clone modelscope
```

#### 6. 指定 envs 目录

默认情况下，Conda 会将环境存储在其安装目录的 `envs` 文件夹中。如果需要自定义，可以通过设置 `envs_dirs` 改变存储路径（例如将环境存储到外部硬盘）。

设置命令：
```bash
conda config --add envs_dirs /path/to/custom_envs
```

### 总结
- `envs` 是 Conda 用来存储虚拟环境的文件夹。
- Conda 环境有助于管理不同项目的依赖，避免冲突。
- 默认配置已经足够大部分场景，只有特殊需求时才需要修改 `envs` 的存储路径。



## 包管理

一旦激活了环境，你就可以使用 conda 在当前环境下安装你所需要的包。

### 安装包




























