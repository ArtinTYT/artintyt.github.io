---
title: 1.文本预处理
date: 2025-04-17 12:22:16
tags:
    - RNN
    - Deep_Learning
    - Text_preprocessing
    - NLP
    - Sequence_Model
categories:
    - RNNs
---
# 1. 文本预处理

## 1. 序列模型

- 序列数据（时序结构）：音乐，语言，视频，文本
- 建模方法：利用条件概率分解（Chain Rule）建模联合概率： 
    $$P(a,b)= P(a) \, P(b|a) = P(b) \, P(a|b)$$
- 对条件概率的建模主要有两种方案：
	- **马尔科夫假设**：只依赖最近 $\tau$ 个历史数据点，简化模型复杂度
	- **潜变量模型**：用潜变量 $h_t = f(x_1, ..., x_{t-1})$ 概括历史信息，$x_t \sim p(x_t|h_t)$
- 时序模型核心思想：当前数据与过去相关
- 自回归模型，通过自身历史数据预测未来

## 2. 步骤

1. **加载文本**  
    将原始文本作为字符串（String）读入内存。
    
2. **分词（Tokenisation）**  
    - 使用 `tokenise` 函数把 **文本列表** 作为输入，
    - **列表** 中每个元素是一个 **文本序列**，
    - 每个 **文本序列** 被切分为 **词元**（token）列表。  
    - **Token** 是文本的基本单位，可能是单词、子词或字符。  
    - 最终返回一个由 **Token** 列表组成的列表。（a list of token lists）
    
3. **构建词表/字典（Vocabulary）**
    - 词元是字符串类型，为了后续建模，需要把每个 token 映射成唯一的数字索引。
    - 构建词表的主要步骤：
	    1. **收集语料（Corpus）**：合并所有训练文本，统计唯一 token，并分配数字索引。
	    2. **排序**：按 token 出现频率从高到低排序。
	    3. **过滤低频词**：设置最低频率阈值，低于此阈值的 token 会被移除，减少复杂性。
	    4. **添加特殊词元**
            - `<unk>`：未登录词（未知词汇）
            - `<pad>`：填充
            - `<bos>`：序列开始
            - `<eos>`：序列结束
	    5. **建立2个核心映射**
            - `token_to_idx`: token → 索引
            - `idx_to_token`: 索引 → token
                
4. **数值化文本**  
    使用词表，将每个文本序列转换为索引序列，变为可直接输入模型的数字数据。

## 3. 总结

- 序列模型通过条件概率分解，建模时序数据中各元素间的依赖关系。
- 文本预处理的核心流程包括：**加载文本、分词、构建词表、数值化**。
- 词表将文本单位（token）映射为数字索引，便于模型处理。

## 参考资料
- [李沐《动手学深度学习》：序列模型](https://zh.d2l.ai/chapter_recurrent-neural-networks/sequence.html)
- [李沐《动手学深度学习》：文本处理](https://zh.d2l.ai/chapter_recurrent-neural-networks/text-preprocessing.html)
- [Bilibili：序列模型](https://www.bilibili.com/video/BV1L44y1m768/)
- [Bilibili：文本处理](https://www.bilibili.com/video/BV1Fo4y1Q79L/)
