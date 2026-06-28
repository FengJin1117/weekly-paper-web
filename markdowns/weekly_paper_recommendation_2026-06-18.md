# 每周论文推荐：2026-06-18

> 研究方向：基于 GRPO 提升 Audio LLM 的 audio caption 能力（时序化建模）
> 关键词：Audio LLM / GRPO / RLHF / Audio Caption / Temporal Modeling
> 本周新增 8 篇推荐，均为 6 月后新发表/更新，与已推荐论文无重复。

---

## Top 1. MAPO: Modality-Aware Policy Optimization for Audio Reasoning

- **年份 / 会议：** 2026-05-26 / arXiv
- **链接：** https://arxiv.org/abs/2605.27741
- **关键词：** Modality-Aware Policy Optimization, GRPO, Modality Collapse, Audio Reasoning
- **推荐理由：** 本文揭示了标准 GRPO 在 Audio LLM 后训练中的关键缺陷——uniform policy gradient 忽略了不同 token 对非文本源模态的依赖程度差异，导致后期推理中模态坍缩（modality collapse），模型逐渐抛弃音频信号转而依赖文本先验输出自信但无grounding的幻觉。MAPO 通过双分支框架解决：模态相关性 mask 动态聚焦梯度到模态关键 token + 辅助注意损失惩罚注意力分布以维持跨模态 grounding。
- **与我当前方向的关系：** 直接命中！GRPO 应用于 Audio LLM 时面临的模态坍缩问题是您实际训练中可能遇到的瓶颈，MAPO 提供了无需领域特定偏好的通用解决方案，可直接迁移到 audio caption 的 GRPO 训练中。
- **可借鉴点：** 双分支 RL 框架设计、模态相关性 mask 计算方法、注意力分布惩罚机制
- **推荐优先级：高** | 建议：**精读**

---

## Top 2. Orchestra-o1: Omnimodal Agent Orchestration with DA-GRPO

- **年份 / 会议：** 2026-06-10 / arXiv
- **链接：** https://arxiv.org/abs/2606.13707
- **关键词：** DA-GRPO, Omnimodal Agent, Agent Orchestration, Audio-Visual
- **推荐理由：** 提出 Decision-Aligned GRPO (DA-GRPO)，一种高效的 agentic 强化学习方法。Orchestra-o1 是全模态（文本+图像+音频+视频）agent 编排框架，通过 DA-GRPO 训练的 8B 模型在 OmniGAIA 基准上达到开源 SOTA。DA-GRPO 针对 agent 决策过程的 reward 设计思路值得参考。
- **与我当前方向的关系：** DA-GRPO 的 reward 设计方法论可直接迁移到 audio caption 的时序奖励建模中，尤其是多维度 process-aware reward 的思路。
- **可借鉴点：** 决策对齐的 reward 设计、多模态 agent 编排、DA-GRPO 训练流程
- **推荐优先级：高** | 建议：**精读**

---

## Top 3. AudioDER: A Deduplication-Enhanced Reasoning Dataset for Post-Training Large Audio-Language Models

- **年份 / 会议：** 2026-06-12 / arXiv
- **链接：** https://arxiv.org/abs/2606.14591
- **关键词：** LALM, Post-Training, Reasoning Dataset, Data Deduplication, CoT
- **推荐理由：** 本文构建了约 191k 样本的推理导向后训练数据集 AudioDER，覆盖声音、语音、音乐，每个样本包含音频 + 多选题 + CoT rationale。实验证明使用 AudioDER 后训练能持续提升 Qwen2-Audio-7B 在 MMAU-mini、MMSU、MMAR 等基准上的推理能力。关键是其冗余感知的数据构建流水线（声学相似度去重），这对您自己构建 caption 训练数据有直接参考价值。
- **与我当前方向的关系：** 您的 caption 模型后训练可以直接使用或参考 AudioDER 的数据构建方法，尤其是 CoT rationale 生成和多选题格式对 reward modeling 训练有益。
- **可借鉴点：** 声学相似度去重流水线、CoT 数据生成方法、multiple-choice 训练格式
- **推荐优先级：高** | 建议：**精读**

---

## Top 4. MOSS-Audio: Unified Audio-Language Model for Speech, Sound, and Music

- **年份 / 会议：** 2026-06-01 / arXiv (技术报告)
- **链接：** https://arxiv.org/abs/2606.01802
- **关键词：** Audio-Language Model, Audio Captioning, Time-Aware QA, Timestamped Transcription, DeepStack
- **推荐理由：** MOSS-Audio 是统一音频语言模型，支持 audio captioning + time-aware QA + timestamped ASR。两个核心技术亮点：(1) DeepStack 跨层特征注入，让 decoder 从多个编码器深度获取声学信息；(2) Time Markers 在音频 token 流中插入显式时间戳标记，实现时序 grounding。4B 和 8B 版本均有 Instruct 和 Thinking 两种配置。
- **与我当前方向的关系：** 直接相关！MOSS-Audio 的 time markers 机制对您关注的时序化 caption 建模有直接借鉴价值。其多阶段后训练策略（SFT → RL）也值得参考。
- **可借鉴点：** Time markers 插入策略、DeepStack 跨层特征注入、事件保留音频标注流水线
- **推荐优先级：高** | 建议：**精读**

---

## Top 5. ThinkDeception: VAC-GRPO for Multimodal Deception Detection

- **年份 / 会议：** 2026-06-17 / arXiv (最新！)
- **链接：** https://arxiv.org/abs/2606.18988
- **关键词：** VAC-GRPO, Visual-Audio Consistency, Progressive Training, Multimodal CoT
- **推荐理由：** 提出 Visual-Audio Consistency GRPO (VAC-GRPO)，配备渐进式训练策略和分层难度数据（4 级），结合多维度 process-aware reward + 反思学习范式。虽然应用场景是欺骗检测，但其 VAC-GRPO 的跨模态一致性建模方法（同一时间窗内音频和视觉信号的一致性奖励）可以直接迁移到 audio caption 的时序跨模态对齐。
- **与我当前方向的关系：** VAC-GRPO 的跨模态一致性 reward 设计非常契合您「audio caption 时序化」方向——在时间轴上对齐音频事件和文本描述。
- **可借鉴点：** 渐进式难度训练策略、跨模态一致性奖励设计、process-aware reward 多维分解
- **推荐优先级：中** | 建议：**泛读**（方法论部分重点看）

---

## Top 6. Investigating GRPO for Diffusion Transformer based Text-to-Audio Generation

- **年份 / 会议：** 2026-03-02 / arXiv
- **链接：** https://arxiv.org/abs/2603.01565
- **关键词：** GRPO, Text-to-Audio, Diffusion Transformer, Reward Design, CLAP
- **推荐理由：** 系统实验了 GRPO 在 DiT-based T2A 生成中的应用，对比多种 reward 函数组合（CLAP、KL、FAD）的效果。虽然不是 audio caption 任务，但 reward 设计的系统性分析——哪些 reward 驱动 fidelity、哪些驱动 prompt adherence——对您的 caption reward 设计有直接参考价值。
- **与我当前方向的关系：** GRPO + Audio 的 reward 设计经验直接可复用。CLAP reward 对您 caption 任务中的 audio-text alignment 奖励设计有参考意义。
- **可借鉴点：** 多 reward 组合实验方法论、CLAP reward 的应用方式、reward 对 fidelity vs adherence 的影响分析
- **推荐优先级：中** | 建议：**泛读**

---

## Top 7. GLASS: GRPO-Trained LoRA for Acoustic Style Steering in Zero-Shot TTS

- **年份 / 会议：** 2026-06-04 / arXiv
- **链接：** https://arxiv.org/abs/2606.05889
- **关键词：** GRPO, LoRA, Acoustic Style Control, Reward Design, Composable Adapters
- **推荐理由：** GLASS 用 GRPO 训练轻量 LoRA adapter 实现声学风格控制，每个控制轴（语速、音高）训练一个 LoRA，通过线性 LoRA 算术可组合、插值。虽然面向 TTS，但其 "reward-defined control direction" 思想和可组合 LoRA 设计对您的 caption 模型有启发——可以训练不同的 caption quality LoRA adapter（如时序准确性、语义覆盖度）动态组合。
- **与我当前方向的关系：** 可组合 LoRA + GRPO 的思路新颖，如果应用到您的 caption 模型中，可以实现 caption quality 维度的灵活控制。
- **可借鉴点：** reward-defined control direction、LoRA 线性组合、WER 作为锚定指标的设计
- **推荐优先级：中** | 建议：**泛读**（方法部分重点看）

---

## Top 8. How Auditory Knowledge in LLM Backbones Shapes Audio Language Models

- **年份 / 会议：** 2026-03-19 / arXiv
- **链接：** https://arxiv.org/abs/2603.19195
- **关键词：** LALM, LLM Backbone, Auditory Knowledge, Benchmark, Evaluation
- **推荐理由：** 系统评估不同 LLM 家族在听觉知识上的差异（通过 AKB-2000 基准），并验证 text-only 听觉知识水平与音频端性能之间的强相关性。这对您选择 caption 模型的 LLM backbone 有指导意义——哪个 LLM 在听觉知识上先天更强。
- **与我当前方向的关系：** 直接关系到您的模型选型决策。了解不同 backbone 的听觉知识差异可以帮助您选择更适合 audio caption 的基座模型。
- **可借鉴点：** AKB-2000 基准、LLM 听觉知识的系统评估方法论、text-only 与 audio-grounded 的相关性分析
- **推荐优先级：低** | 建议：**收藏**

---

## 阅读建议总结

| 优先级 | 论文 | 建议 |
|--------|------|------|
| **高** | Top 1-4 | 精读：MAPO（GRPO模态坍缩修复）、Orchestra-o1（DA-GRPO）、AudioDER（后训练数据）、MOSS-Audio（时序建模） |
| **中** | Top 5-7 | 泛读：VAC-GRPO（跨模态一致性）、GRPO+T2A（reward设计）、GLASS（可组合LoRA） |
| **低** | Top 8 | 收藏：LLM backbone选择参考 |

