---
title: Conda环境配置
date: 2025-01-24 19:10:48
tags:
  - Conda
  - macOS

categories:
  - LLMs

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


#### 7. 导出环境
将当前环境导出为一个YAML文件，方便共享：
```bash
# 语法 conda env export > <filename.yml>
conda env export > environment.yml
```
项目经理可能给你一个配置文件，然后用配置文件创建新的环境。

#### 8. 导入环境：从文件创建环境
使用YAML文件创建一个新环境：
```bash
# 语法 conda env create -f <filename.yml> -n <new environment name>
conda env create -f environment.yml -n newenvi
```
如果不指定新名字， 可以不加后面 `-n <new environment name>`。

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

可以查看已经下好的包：
```bash
pip list
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

你也可以直接修改 Conda 的配置文件来设置镜像：

- 找到并编辑 Conda 的配置文件：`~/.condarc`（Linux和macOS）或 `C:\Users<用户名>.condarc`（Windows）。TUNA 提供了 Anaconda 仓库与第三方源（conda-forge、msys2、pytorch等，各系统都可以通过修改用户目录下的 `.condarc` 文件来使用 TUNA 镜像源。Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行 `conda config –set show_channel_urls yes` 生成该文件之后再修改。
- 添加或修改如下内容：
	```bash
	channels:
		- defaults
	show_channel_urls: true
	default_channels:
		- https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
		- https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
		- https: mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
	custom_channels:
		conda-forge: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		msys2: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		bioconda: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		menpo: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		pytorch: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		pytorch-lts: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		simpleitk: https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
		deepmodeling:
	https: mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/
	```

运行 `conda clean -i` 清除索引缓存，保证用的是镜像站提供的索引。

#### 验证和测试
在设置完镜像后，你可以通过安装软件包来测试镜像是否工作正常。例如：
```bash
conda install numpy
```
查看输出的信息，确保包是从你设置的镜像URL下载的。



## Mamba 使用
Mamba 是一个用于管理 Conda 环境和包的开源工具，旨在解决 Conda 在处理大型环境时的速度和性能问题。它与 Conda 兼容，但提供更快的依赖解析和包安装，这使得它在处理复杂环境时更加高效。

### Mamba 的关键特点
- **快速的依赖解析**： Mamba 使用一个高效的 C++ 库进行依赖解析，这使得在面对复杂的包依赖时能更快地找到解决方案。
- **并行下载**：Mamba 可以并行下载和安装包，这大大减少了安装时间，特别是在需要下载大量包的情况下。
- **与 Conda 兼容**：Mamba 可以无缝替代 Conda 的命令，你可以在几乎所有 Conda 命令中直接使用 mamba 来替换 conda。
- **更好的用户体验**：提供更直观的输出信息和进度条，让用户可以更清晰地了解安装进度和过程。

### 安装 Mamba
要安装 Mamba，你首先需要一个 Conda 环境。以下是在已有 Conda 环境中安装 Mamba 的步骤：
如果你希望在特定环境中安装 Mamba，可以先激活该环境：
```bash
conda activate myenv
```

你可以通过 Conda-Forge 通道安装 Mamba，因为 Mamba 在该通道上维护得很好：
```bash
conda install mamba -n base -c conda-forge
```

这里 `-n base` 表示将 Mamba 安装在 base 环境中，这样你可以在任何环境中使用 Mamba。

### 使用 Mamba

Mamba可以直接替代 Conda 的命令。以下是一些常见的 Conda 命令及其 Mamba 等效用法：
- 创建环境：mamba create –name myenv python=3.8
- 激活环境：conda activate myenv （Mamba不改变环境激活命令，你仍然使用 Conda 的激活命令）
- 安装包：mamba install numpy
- 更新包：mamba update numpy
- 删除包：mamba remove numpy
- 更新环境中的所有包：mamba update –all

### 优势
- 速度：Mamba 在处理包管理和环境解决时速度快得多，这对大环境尤其有用。
- 效率：并行下载和安装机制使得整体过程更加高效。
- 兼容性：能够无缝替代 Conda，并与其生态系统兼容。

### 局限性
- 新兴工具：作为一个较新的工具，Mamba可能在某些边缘情况下不如 Conda 稳定。
- 社区支持：虽然 Mamba 的社区在快速增长，但它仍然没有 Conda 那么成熟。


## Jupyter Lab 使用
### Jupyter 介绍
JupyterLab 是最新的基于 Web 的交互式开发环境，适用于 notebooks、代码和数据。其灵活的界面允许用户配置和安排数据科学、科学计算、计算新闻和机器学习中的工作流程。模块化设计允许扩展来扩展和丰富功能。

### Jupyter 安装使用
使用 安装 JupyterLab ： pip
```bash
pip install jupyterlab
```

注意：如果您使用 conda 或 mamba 安装 JupyterLab，我们建议使用 condaforge 通道。安装后，使用以下命令启动 JupyterLab：
```bash
jupyter lab
```

### PyCharm 中使用 Conda 环境
1. 创建项目所需要的虚拟环境
```bash
conda create -n llamaindex-rag python=3.10
```

2. 创建项目，选择 自定义环境 ，类型选择 Conda ，环境选择 `llamaindex-rag` ，点击 `创建` 即可.

3. 查看项目环境配置


注意：项目中需要另外的依赖库，直接到 `Conda Powershell Prompt` 终端下，激活 `llamaindex-rag` 环境，使用 `pip` 安装依赖库即可！



### 关于 modelscope 的常用指令
我们会先用 conda 创建项目，然后激活项目再下载库或模型：
```BASH
pip install modelscope
```

一般在项目中，我们会获得一个 `requirements.txt` 文件，里面写好了 各种配置的版本 比如 `python=3.10`，然后使用下面安装：
```bash
pip install -r ./requirements.txt
```

