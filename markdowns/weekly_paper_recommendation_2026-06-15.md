# 每周论文推荐：2026-06-15

本周重点补齐两类高相关文献：一类是 `temporal grounding / temporal reasoning`，直接服务于时序化 audio caption；另一类是 `GRPO / RL post-training / preference optimization`，可直接迁移到你当前“基于 GRPO 提升 Audio LLM caption 能力”的方法设计。以下条目已对照 [`D:\projects\remotion\recommended_papers.jsonl`](D:\projects\remotion\recommended_papers.jsonl) 去重，均未在历史推荐中出现。

## 1. SpotSound: Enhancing Large Audio-Language Models with Fine-Grained Temporal Grounding

- 年份/会议：2026 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2604.13023)
- 关键词：Audio LLM, temporal grounding, long-form audio, timestamp localization, hallucination suppression
- 推荐理由：这篇基本正中你当前“时序化建模”靶心。它不是泛化的整体音频理解，而是专门解决长音频里“事件什么时候发生”的定位问题，并且显式处理不存在事件时的时间戳幻觉。
- 与我当前方向的关系：如果你要把 flat caption 推到带时间结构的 caption，先补齐 `temporal grounding` 能力几乎是必要前置；这篇是最直接的近期参考之一。
- 可借鉴点：负样本时间戳抑制目标、needle-in-a-haystack 式时序评测、从 clip-level supervision 转向 fine-grained temporal supervision 的训练设计。
- 推荐优先级：A+
- 建议：精读

## 2. Reinforcement Learning Outperforms Supervised Fine-Tuning: A Case Study on Audio Question Answering

- 年份/会议：2025 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2503.11197)
- 关键词：GRPO, Audio LLM, reinforcement learning, post-training, AQA
- 推荐理由：这是目前最直接把 `GRPO` 用到 Audio LLM 上的工作之一，而且结论非常贴近你现在的方法问题：小规模 post-training 数据下，RL 明显优于 SFT。
- 与我当前方向的关系：任务不是 caption 而是 AQA，但方法层面对你最关键，尤其是“Audio 域里 GRPO 是否值得做、需要多少数据、显式 reasoning 是否真的有效”这几个问题，它都给了直接证据。
- 可借鉴点：GRPO 训练配方、样本规模与收益关系、SFT vs RL 的对比实验模板、如何定义 audio-language 任务里的 reward 与可验证目标。
- 推荐优先级：A+
- 建议：精读

## 3. Learning to See through Sound: From VggCaps to Multi2Cap for Richer Automated Audio Captioning

- 年份/会议：2025 / EMNLP 2025
- 链接：[ACL Anthology](https://aclanthology.org/2025.emnlp-main.715/)
- 关键词：audio captioning, multimodal LLM, audio-visual grounding, rich caption, VggCaps
- 推荐理由：这篇不是后训练论文，但它是本周最值得补的 caption 主任务论文之一。核心价值在于把传统过短、过平的音频 caption 扩展成更丰富的描述，并通过 audio-visual grounding 提升语义细节。
- 与我当前方向的关系：你如果想让 Audio LLM 生成更长、更细、更结构化的 caption，先看 richer caption 的数据和生成范式很有必要；它能补齐“caption 长什么样才值得优化”的任务侧认识。
- 可借鉴点：利用视频语义扩充音频 caption、预训练阶段做 audio-visual grounding、用 richer caption 数据作为后续 SFT 或 reward 数据来源。
- 推荐优先级：A
- 建议：精读

## 4. Enhancing Temporal Understanding in Audio Question Answering for Large Audio Language Models

- 年份/会议：2025 / NAACL 2025 Industry
- 链接：[arXiv](https://arxiv.org/abs/2409.06223)
- 关键词：temporal reasoning, Audio LLM, curriculum learning, data augmentation, AQA
- 推荐理由：这篇从 temporal AQA 角度非常系统地讨论了 Audio LLM 的时序理解短板，并用 LLM 生成 temporal QA 数据，再配合 curriculum learning 做专门强化。
- 与我当前方向的关系：虽然输出不是 caption，但“如何把时序知识注入 Audio LLM”这个问题与你高度同构，尤其适合作为 caption 之前的中间训练阶段参考。
- 可借鉴点：temporal QA 数据合成、课程学习式专门化微调、把时序能力单独作为中间目标而不是直接在 caption 端硬优化。
- 推荐优先级：A-
- 建议：精读

## 5. Enhancing Retrieval-Augmented Audio Captioning with Generation-Assisted Multimodal Querying and Progressive Learning

- 年份/会议：2025 / Interspeech 2025
- 链接：[arXiv](https://arxiv.org/abs/2410.10913)
- 关键词：audio captioning, retrieval-augmented generation, multimodal querying, progressive learning
- 推荐理由：它不是 RL 方向，但很适合补“如何稳定提升 caption factuality 和细节覆盖率”。它通过先生成文本描述再做 multimodal retrieval，使检索与知识库结构更一致。
- 与我当前方向的关系：如果后面你发现 GRPO 容易把 caption 优化到更流畅但不更忠实，这篇提供了一条正交路线：通过 retrieval 和外部记忆减少 hallucination，再叠加后训练。
- 可借鉴点：caption 生成前的辅助检索、progressive learning 训练日程、把检索结果转化为 reward features 或 reranking signals。
- 推荐优先级：A-
- 建议：泛读

## 6. AudSemThinker: Enhancing Audio-Language Models through Reasoning over Semantics of Sound

- 年份/会议：2025 / NeurIPS 2025
- 链接：[arXiv](https://arxiv.org/abs/2505.14142)
- 关键词：Audio LLM, semantic reasoning, auditory semantics, caption generation, reasoning data
- 推荐理由：这篇的重点不是时间，而是“声音语义推理框架”。它试图把 ALM 从表层识别推进到更细粒度的语义 reasoning，对高质量 caption 很关键。
- 与我当前方向的关系：时序 caption 不只是把事件排顺序，还要保证每个时间片的语义描述有分辨率；这篇能补齐细粒度 semantic reasoning 一侧。
- 可借鉴点：auditory semantics 组织方式、caption 驱动的数据构造、多阶段 pipeline 生成 reasoning supervision、语义层 reward 维度设计。
- 推荐优先级：B+
- 建议：泛读

## 7. From Contrast to Commonality: Audio Commonality Captioning for Enhanced Audio-Text Cross-modal Understanding in Multimodal LLMs

- 年份/会议：2025 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2508.01659)
- 关键词：audio captioning, multimodal LLM, contrastive captioning, commonality captioning, cross-modal alignment
- 推荐理由：这篇非常适合你关注的“caption 任务如何服务于 Audio LLM 对齐”。它把 caption 从单音频描述扩展为多音频共同语义建模，强调对齐而非单点生成。
- 与我当前方向的关系：如果你准备做 reward 或偏好建模，这篇提供了一个很有价值的角度：除了“描述得是否详细”，还可以优化“是否抓住共享核心语义、是否保持泛化能力”。
- 可借鉴点：ACC 任务定义、避免 catastrophic forgetting 的 caption 型训练任务、把 caption 作为跨模态对齐目标而不只是下游输出。
- 推荐优先级：B+
- 建议：收藏

## 8. Temporal Preference Optimization of Large Multimodal Models

- 年份/会议：2025 / ICLR 2026 Withdrawn Submission
- 链接：[OpenReview](https://openreview.net/forum?id=vZLZyNxeOa)
- 关键词：temporal preference optimization, preference learning, post-training, temporal grounding, video-LMM
- 推荐理由：虽然这是视频 LMM 而非 Audio LLM，而且当前状态是 `ICLR 2026 withdrawn submission`，但方法上非常值得看。它核心是用自动构造的时间对比偏好对做 preference learning，不依赖人工标注。
- 与我当前方向的关系：这和你要做的 GRPO/reward 设计高度同构，尤其适合思考“怎样自动制造优/劣 caption 或优/劣时序解释对”，从而降低人偏好标注成本。
- 可借鉴点：自动生成 temporal preference pairs、无人工偏好标注的 post-training、把 temporal grounding 约束转成偏好学习信号。
- 推荐优先级：B+
- 建议：精读

## 本周最值得先读的 4 篇

1. `SpotSound`：最贴近时序化 audio caption 的能力短板本身。
2. `R1-AQA`：最直接回答 Audio LLM 上 `GRPO` 到底有没有用。
3. `Multi2Cap`：最值得补的 rich audio caption 主任务论文。
4. `Temporal Preference Optimization`：最适合迁移到 caption reward / preference 构造。

## 建议阅读顺序

1. 先读 `SpotSound` + `Enhancing Temporal Understanding in AQA`，补时序能力建模。
2. 再读 `R1-AQA` + `Temporal Preference Optimization`，收敛 GRPO / 偏好优化方案。
3. 然后读 `Multi2Cap` + `Retrieval-Augmented Audio Captioning`，补 caption 数据与生成质量提升路线。
4. 最后用 `AudSemThinker` + `ACC` 扩展语义推理和跨模态对齐视角。

## 执行状态

- 已生成本周报告：[`D:\projects\remotion\weekly_paper_recommendation_2026-06-15.md`](D:\projects\remotion\weekly_paper_recommendation_2026-06-15.md)
- 已更新去重记录：[`D:\projects\remotion\recommended_papers.jsonl`](D:\projects\remotion\recommended_papers.jsonl)
