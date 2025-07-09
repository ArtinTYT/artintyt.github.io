---
title: 3. Bahdanau 注意力（Seq2Seq + Attention）
date: 2025-04-19 12:01:10
tags:
    - Bahdanau
    - Attention
    - Seq2Seq
    - NLP
    - Deep_Learning
categories:
    - Attention
---
# 3. Bahdanau 注意力（Seq2Seq + Attention）

## 1. 动机

- **经典 Seq2Seq（编码器-解码器）模型**使用两个 RNN：
    - **Encoder**：把整个输入序列"压缩"为一个**固定长度**的上下文向量（context）。
    - **Decoder**：每一步都依赖这同一个 context 生成下一个输出。
        
- **局限性**：
    1. 输入句子很长时，**固定长度的 context 向量无法承载全部信息**，导致信息丢失。
    2. 实际每个目标词往往只需要关注输入序列的不同部分，而原始 Seq2Seq 总是用同一个 context，缺乏"定位感"。

## 2. 解决方法：引入 Attention

- **核心思想**：  
    上下文 $\mathbf{c}$ 不再固定，而是**每一步动态计算**，由解码器当前状态（query）和所有编码器输出（key/value）共同决定。
    
- **工作流程**：
    1. **Encoder** 输出序列 ${\mathbf{h}_1, ..., \mathbf{h}_T}$（每个词的隐藏状态）。
    2. 每个解码时刻 $t'$，用上一步 Decoder 状态 $\mathbf{s}_{t'-1}$ 作为 **query**，Encoder每个隐藏状态 $\mathbf{h}_t$ 作为 **key** 和 **value**。
    3. 计算注意力权重 $\alpha(\mathbf{s}_{t'-1}, \mathbf{h}_t)$，得到各输入对当前输出的贡献度。
    4. **动态上下文向量**计算公式：
        $$\mathbf{c}_{t'} = \sum_{t=1}^T \alpha(\mathbf{s}_{t'-1}, \mathbf{h}_t)\mathbf{h}_t$$

    5. $\mathbf{c}_{t'}$ 与 Decoder 其他输入（如上一步输出）一起，决定 decoder 下一个状态 $\mathbf{s}_{t'}$ 和生成的输出。

	<img src="/images/img/img_att_seq2seq_Att.png" width=400 style="display: block; margin: 0 auto;"/>


## 3. 总结

- **Seq2seq 模型**：通过 hidden state 在 Encoder 和 Decoder 间传递信息。
- **Bahdanau Attention** 能让 Decoder 每一步"自适应"关注输入的关键片段，实现更智能的序列对齐和翻译。


## 参考资料

[李沐《手动深度学习》：Bahdanu注意力](https://zh.d2l.ai/chapter_attention-mechanisms/bahdanau-attention.html)
[Bilibili：Bahdanu注意力](https://www.bilibili.com/video/BV1v44y1C7Tg/)
