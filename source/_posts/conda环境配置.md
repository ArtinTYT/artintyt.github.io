---
title: Conda环境配置
date: 2025-01-24 19:10:48
tags:
  - Conda
  - MacOS

categories:
  - 大模型

---
以下步骤基于 MacOS 系统（MacBookAir M2），如果是 Windows 系统，命令会不同。


## 1. 官网下载安装

下载mini conda：https://www.anaconda.com/download/success


### 1.1 安装完成后测试

使用以下命令查看版本和测试安装是否成功：
```bash
conda --verison
```

Terminal显示如下状态：
```BASH
conda 24.11.1
```

### 1.2 验证Base环境
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

### 1.3 查看默认Python版本
查看 conda 默认的 Python 版本，后面会创建指定 Python 某版本的环境。
```bash
python --version
```
可能看到（默认的，可能新 Conda 环境不会使用）：
```BASH
Python 3.12.8
```


## 2. Conda常用命令
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

## 3. 环境管理

### 3.1 查看 Conda 环境路径是否正确设置
通过一下命令查看环境设置：
```BASH
conda config --show
```
可能会看到你的环境存储路径如下：
1.	`/opt/miniconda3/envs`（默认路径，位于 Miniconda 安装目录）
2.	`/Users/username/.conda/envs`（用户目录下的备用路径）

这些路径是 Conda 的默认配置，如果你对存储位置没有特别要求，无需修改 `envs_dirs`。


### 3.2 envs_dirs是什么？
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


### 3.3 如何管理 Conda 环境？

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
如果不指定 Python 版本，默认是 base 里面的 Python 版本。

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
退出到 `base` 环境再执行删除环境：
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

### 3.4 总结
- `envs` 是 Conda 用来存储虚拟环境的文件夹。
- Conda 环境有助于管理不同项目的依赖，避免冲突。
- 默认配置已经足够大部分场景，只有特殊需求时才需要修改 `envs` 的存储路径。



## 4. 包管理

一旦激活了环境，你就可以使用 conda 在当前环境下安装你所需要的包。

### 4.1 安装包

在激活的环境中安装包，例如安装NumPy：
```bash
conda install numpy
```

没有指定是最新版本，一般项目会指定版本：
```bash
conda install numpy=1.18
```

### 4.2 更新包
更新某个包到最新版本：
``` bash
conda update numpy
```

更新**所有**包到最新版本，但是不建议用：
```bash
conda update --all
```

执行命令后，Conda 将会对版本进行比较并列出可以升级的版本。同时，也会告知用
户其他相关包也会升级到相应版本。当较新的版本可以用于升级时，终端会显示
Proceed ([y]/n)? ，此时输入 y 即可进行升级。

### 4.3 卸载包
如果不再需要某个包，可以将其卸载：
``` bash
conda remove numpy
```

### 4.4 查看环境所有包
```bash
conda list
```

查看当前环境中已经安装的所有包（base 和 项目环境`<modelscope>`）：
```bash
conda list
```


### 4.5 搜索包

搜索可用的包及其版本信息：
```bash
conda search <package-name>
```


## 5. 使用通道

Conda 通道（Channel）是 Conda 用来查找和下载软件包的源。通道就像是软件仓库，用户可以从这些通道中获取需要的软件包。理解和有效管理 Conda 通道，可以帮助用户更好地控制软件包的来源、版本以及稳定性。

### 5.1 主要通道

- **默认通道**：这是Conda自带的官方通道，由 Anaconda 维护，包含了常用的数据科学和机器学习包。默认通道提供的包经过测试和优化，通常是稳定且值得信赖的。
- **Conda-Forge**：Conda-Forge是一个社区驱动的通道，拥有数量庞大的软件包和活跃的维护者社区。通常情况下，Conda-Forge提供更多的最新软件包版本，对于一些在默认通道中没有的包来说尤为重要。由于是社区维护，更新速度快，适合需要最新特性和支持的用户。
- **Bioconda**：专为生物信息学和生物数据分析设计的通道。包含很多用于生物数据处理和分析的工具。

### 5.2 查看已配置的通道
令查看当前配置的通道列表：
```bash
conda config --show channels
```

### 5.3 添加新的通道
如果需要从其他通道安装包，可以将其添加到Conda配置中。例如，添加CondaForge：
```bash
conda config --add channels conda-forge
```

### 5.4 设置通道顺序
通道是按顺序搜索的，优先使用在前面的通道。可以通过以下命令调整顺序：
```bash
conda config --set channel_priority strict
```
使用 `strict` 优先级时，Conda 会严格按照通道顺序来选择包。

### 5.5 删除通道
如果不需要某个通道，可以将其移除：
```bash
conda config remove channels <channel-name>
```


### 5.6 临时使用特定通道

你可以在安装包时临时指定通道，而不改变全局配置。例如：
```bash
conda install package-name -c conda-forge
```
这样做会从 Conda-Forge 通道安装指定的包。


### 5.7 通道优先级
Conda 允许设置通道优先级，以决定从哪个通道下载软件包。默认情况下，Conda会
根据通道列表的顺序依次查找包。你可以通过以下命令启用或禁用通道优先级：
```bash
conda config set channel_priority true  # 启用优先级
conda config set channel_priority false # 禁用优先级
```
启用优先级后，Conda会严格根据通道顺序来选择包，确保从首选通道安装。

### 5.8 创建自定义通道
如果你需要在团队中共享包，或者需要托管私有包，可以创建自己的Conda通道。自定义通道可以通过简单的 HTTP 服务器（如 NGINX 或 Apache）托管，或者使用 Anaconda 的企业解决方案。

## 6. 设置镜像
为了提高 Conda 包的下载速度，特别是在网络连接到默认的 Conda 服务器速度较慢的情况下,设置国内镜像（或其他更接近你的地理位置的镜像）是一个常见且有效的方法。


### 6.1 设置 Conda 镜像的步骤

#### 方法一：通过命令行配置
你可以使用conda config命令来添加镜像。例如，使用清华大学的Anaconda镜像。
- 打开命令提示符或终端。
- 添加镜像URL：
	```bash
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda
	conda config add channels
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo
	conda config set show_channel_urls yes
	```
	默认情况下，conda config 添加的通道会排在列表的头部，但你可以通过以下命令来
确认顺序：
	```bash
	conda config show channels
	```

#### 方法二：通过修改配置文件













