# 每周论文推荐：2026-06-08

> 本周方向：Audio LLM / GRPO / Audio Caption / 时序化建模
> 检索源：arXiv API | 日期：2026-06-08

---

## Top 1. FSA-GRPO: Teaching Auditory LLMs to Use Few-shot Demonstrations

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2606.02615
- 关键词：GRPO, Auditory LLM, Few-shot, Post-training, RL
- 推荐理由：直接在 Auditory LLM 上应用 GRPO 的后训练方法。FSA-GRPO 设计了专门奖励函数鼓励模型利用 few-shot 示例，仅用高资源成人 ASR 数据训练即可泛化到儿童语音识别、语音翻译和音频理解。是 GRPO 在 Audio LLM 后训练中最新的方法论文。
- 与我当前方向的关系：**高度匹配**。GRPO + Audio LLM + post-training，且展示了 RL 后训练在低资源场景的优势，方法论可直接借鉴。
- 可借鉴点：Few-shot aware reward 设计思路；高资源训练→低资源泛化的迁移策略；数据选择和辅助奖励加权实验。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 2. D-ORCA: Dialogue-Centric Optimization for Robust Audio-Visual Captioning

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2602.07960
- 关键词：GRPO, Audio-Visual Captioning, Reward Design, Temporal Grounding
- 推荐理由：**首次将 GRPO 与三个新颖的奖励函数应用于音视频 captioning**，评估说话人归属准确度、语音内容准确度和句子级时间边界对齐。这些奖励函数源自语音处理评估指标，首次作为 RL 目标用于音视频 captioning。8B 参数模型在多个基准上达到与 Qwen3-Omni 竞争的性能。
- 与我当前方向的关系：**极高匹配**。GRPO + Captioning + 时序相关奖励 = 完美覆盖用户三大核心方向。
- 可借鉴点：三个 GRPO 奖励函数设计（speaker attribution / speech content / temporal boundary）；DVD 双语数据集构建方法；temporal alignment reward 可直接迁移到 audio caption 时序化建模。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 3. TAC: Timestamped Audio Captioning

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2602.15766
- 关键词：Timestamped Audio Captioning, Temporal Grounding, LALM, Synthetic Data
- 推荐理由：直接解决 LALM 在复杂声学场景中时序不一致和幻觉问题。TAC 生成带时间戳的音频描述，合成数据管线构建多声混合训练。TAC→LLM 级联在 MMAU-Pro、MMSU 等 benchmark 上达到 SOTA。
- 与我当前方向的关系：**直接命中时序化建模方向**。Timestamped caption 正是 temporal audio caption 的核心形态。
- 可借鉴点：时间戳 caption 的输出格式设计；合成数据管线（多声混合→时间标注）；TAC→LLM 级联架构可用于提升 Audio LLM 的 caption 质量。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 4. Aligning Audio Captions with Human Preferences

- 年份 / 会议：2025 / Submitted to Interspeech 2026
- 链接：https://arxiv.org/abs/2509.14659
- 关键词：RLHF, Audio Captioning, CLAP Reward Model, Preference Alignment
- 推荐理由：**首个将 RLHF 应用于 audio captioning 的框架**。训练基于 CLAP 的奖励模型使用人工标注的成对偏好数据，RL 微调任何 baseline captioning 系统而无需 ground-truth 标注。人类评估显示生成的 caption 在正确性和自然性上均优于 baseline。
- 与我当前方向的关系：**高度匹配**。RLHF + Audio Captioning 是 GRPO 的上游/平行方向，reward model 构建方法可迁移。
- 可借鉴点：CLAP-based reward model 训练方法；pairwise preference data 标注方案；无需 ground-truth 的 RL 微调流程。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 5. LAMB: LLM-based Audio Captioning with Modality Gap Bridging via Cauchy-Schwarz Divergence

- 年份 / 会议：2026 / ICASSP 2026
- 链接：https://arxiv.org/abs/2601.04658
- 关键词：LLM-based Audio Captioning, Cross-Modal Alignment, AudioCaps SOTA
- 推荐理由：ICASSP 2026 论文。通过 Cauchy-Schwarz 散度最小化跨模态对齐，设计 Two-Stream Adapter 和 Token Guide，在 AudioCaps 上达到 SOTA。展示了 LLM decoder + 跨模态对齐的有效路径。
- 与我当前方向的关系：**直接相关**。LLM-based audio captioning 的架构设计，跨模态对齐方法可用于 GRPO 训练前的模型对齐阶段。
- 可借鉴点：Cross-Modal Aligner 的实现；Cauchy-Schwarz 散度作为对齐目标；Token Guide 直接在 LLM 文本空间打分引导输出。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 6. AdaGRPO: A Capability-Aware Adaptive Enhancement for Flow-based GRPO

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2606.06828
- 关键词：GRPO, Adaptive, Curriculum, Advantage Fusion
- 推荐理由：GRPO 算法本身的重要改进。提出在线课程过滤策略和跨层优势融合，解决 GRPO 学习与模型当前能力解耦的问题。作为即插即用模块，可与现有 GRPO 框架无缝集成。
- 与我当前方向的关系：**方法论高度相关**。AdaGRPO 的改进可直接集成到 Audio LLM 的 GRPO 训练中。
- 可借鉴点：Online Curriculum Filtering（动态选择匹配学习边界的 prompt）；Cross-Level Advantage Fusion（组内+全局优势融合）。
- 建议阅读级别：**泛读**
- 推荐优先级：中

---

## Top 7. TimeChat-Captioner: Scripting Multi-Scene Videos with Time-Aware and Structural Audio-Visual Captions

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2602.08711
- 关键词：GRPO, Dense Captioning, Temporal, Audio-Visual, SFT+GRPO
- 推荐理由：提出 Omni Dense Captioning 任务，使用六维结构化 schema 生成"剧本式"描述。训练流程为 SFT + GRPO with task-specific rewards，超越 Gemini-2.5-Pro，下游显著提升音视频推理和时间定位能力。
- 与我当前方向的关系：**SFT+GRPO 的训练范式**和**结构化时序描述**与用户方向高度契合。
- 可借鉴点：SFT→GRPO 两阶段训练流程；task-specific reward 设计；结构化 caption schema 对 temporal caption 的启发。
- 建议阅读级别：**精读**
- 推荐优先级：高

---

## Top 8. FlowSE-GRPO: Training Flow Matching Speech Enhancement via Online Reinforcement Learning

- 年份 / 会议：2026 / ICASSP 2026
- 链接：https://arxiv.org/abs/2601.16483
- 关键词：GRPO, Flow Matching, Speech Enhancement, Multi-Metric Reward
- 推荐理由：ICASSP 2026。首次将在线 GRPO 成功整合到 flow-matching 语音增强框架。提出多指标奖励优化策略平衡竞争目标，缓解 reward hacking。
- 与我当前方向的关系：GRPO 在音频连续信号上的适配，多指标 reward 平衡策略可直接迁移到 audio caption 的 GRPO 训练。
- 可借鉴点：连续时序信号上的 GRPO 适配方法；多指标 reward 设计与 reward hacking 缓解。
- 建议阅读级别：**泛读**
- 推荐优先级：中

---

## Top 9. BRACE: A Benchmark for Robust Audio Caption Quality Evaluation

- 年份 / 会议：2025 / Preprint
- 链接：https://arxiv.org/abs/2512.10403
- 关键词：Audio Caption Evaluation, CLAPScore, Hallucination Detection
- 推荐理由：专门评估 audio caption 质量的 benchmark。包含幻觉检测子基准，揭示 CLAPScore 在 caption 评估中的局限性。最佳 CLAP-based 评估仅 70.01 F1，LALM 仅 63.19。
- 与我当前方向的关系：评估方法是 RL 训练的关键基础设施。了解现有评估的局限性有助于设计更好的 reward function。
- 可借鉴点：BRACE-Main 和 BRACE-Hallucination 的评估维度设计；幻觉检测方案；CLAPScore 局限性分析指导 reward 改进。
- 建议阅读级别：**收藏**
- 推荐优先级：中

---

## Top 10. SpectCount: Spectrotemporal Counting via Synthetic Signals Improves Large Audio Language Models

- 年份 / 会议：2026 / Preprint
- 链接：https://arxiv.org/abs/2606.06907
- 关键词：LALM, Synthetic Data, Fine-grained Perception, Data-efficient
- 推荐理由：通过合成信号发现和修复 LALM 的时频感知弱点，无需真实音频或标注。SpectCount 不仅解决观察到的弱点，还在音效/音乐/语音 benchmark 上泛化提升。
- 与我当前方向的关系：合成数据增强方法可用于 audio caption 训练数据的扩充；时频感知弱点的诊断方法可用于定位 caption 质量瓶颈。
- 可借鉴点：Probing signal detectability 分析 LALM 弱点；on-the-fly 合成信号生成策略；data-efficient fine-tuning。
- 建议阅读级别：**收藏**
- 推荐优先级：中

---

## 补充推荐

### DiaDem: Advancing Dialogue Descriptions in Audiovisual Video Captioning

- 链接：https://arxiv.org/abs/2601.19267
- 亮点：两阶段 GRPO（difficulty-partitioned）增强对话描述准确性，超越 Gemini 系列在对话描述精度上的表现。
- 关联：GRPO 分难度训练策略对 audio caption 的 GRPO 训练有启发。

### TACOS: Temporally-aligned Audio CaptiOnS for Language-Audio Pretraining

- 链接：https://arxiv.org/abs/2505.07609
- 亮点：帧级对比训练策略，将文本描述与音频中的时间区域对齐。12K 音频+时间标注数据集。
- 关联：时序对齐训练方法可直接迁移到 temporal audio caption 建模。

### RREDCoT: Segment-Level Reward Redistribution for Reasoning Models

- 链接：https://arxiv.org/abs/2606.06475
- 亮点：利用模型自身近似最优 reward redistribution，无需额外生成。解决 GRPO 延迟奖励问题。
- 关联：Reward redistribution 方法可解决 audio caption GRPO 中句子级奖励粒度过粗的问题。

---

*报告自动生成于 2026-06-08 | 检索词覆盖：audio caption + LLM, GRPO + audio, temporal audio caption, reward model + audio captioning, multimodal caption + RL 等 10 组关键词*
