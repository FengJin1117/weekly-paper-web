# 每周论文推荐：2026-06-08

本周重点补齐了上一轮未覆盖、且未出现在 [`D:\projects\remotion\recommended_papers.jsonl`](D:\projects\remotion\recommended_papers.jsonl) 中的高相关论文，优先看 `audio/video caption + temporal modeling + Audio LLM/post-training` 的交叉区域。

## 1. AVoCaDO: An Audiovisual Video Captioner Driven by Temporal Orchestration

- 年份/会议：2025 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2510.10395)
- 关键词：video caption, temporal orchestration, audiovisual LLM, long-context, caption planning
- 推荐理由：这篇工作直接把“按时间组织描述”作为核心设计点，不是只做普通 caption 解码。虽然任务是视频 caption，但方法上非常接近你要的“时序化 audio caption”。
- 与我当前方向的关系：如果你要让 Audio LLM 生成按事件顺序展开的 caption，这篇可以当结构先验参考。
- 可借鉴点：分段式/时序式 caption 规划、长上下文事件组织、把 caption 从“单句摘要”改成“有时间结构的叙述”。
- 推荐优先级：A
- 建议：精读

## 2. Listening Between the Frames: Bridging Temporal Gaps in Large Audio-Language Models

- 年份/会议：2026 / AAAI 2026
- 链接：[AAAI](https://ojs.aaai.org/index.php/AAAI/article/view/39827)
- 关键词：Audio LLM, TimeAudio, temporal modeling, long audio, timestamp reasoning, structured understanding
- 推荐理由：这篇论文提出的方法名就是 `TimeAudio`。标题和任务设定都直指 Audio LLM 的 temporal gap，是本轮最贴近“时序建模短板”本身的一篇。
- 与我当前方向的关系：你的目标不是一般音频理解，而是把 caption 做得更时间敏感；这篇就是最直接的任务层补充。
- 可借鉴点：时间提示设计、长音频切分与聚合、事件级表示、时序一致性评测思路。
- 推荐优先级：A
- 建议：精读

## 3. Listening with Time: Temporally Informed Prompting Improves Spatial Audio Understanding

- 年份/会议：2026 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2604.22245)
- 关键词：temporal prompting, spatial audio understanding, Audio LLM, prompt engineering, temporal cues
- 推荐理由：它不是 caption 论文，但核心价值在于证明“显式时间信息注入”本身能显著改变模型对音频场景的理解质量。
- 与我当前方向的关系：如果你后面做 GRPO，reward 之外很可能还要配合 prompt/interface 设计，这篇提供了轻量但实用的思路。
- 可借鉴点：时间标记提示、时间窗提示模板、把时间结构前置到输入而非只靠后训练逼出来。
- 推荐优先级：A-
- 建议：精读

## 4. Audio Flamingo 2: An Audio-Language Model with Long-Audio Understanding and Expert Reasoning Abilities

- 年份/会议：2025 / arXiv
- 链接：[arXiv](https://arxiv.org/abs/2503.03983)
- 关键词：Audio LLM, long-audio understanding, reasoning, instruction tuning, multi-task post-training
- 推荐理由：这篇更偏通用 Audio LLM 能力，但它把长音频理解和 expert reasoning 放到了同一个系统里，适合作为后训练与任务迁移基线。
- 与我当前方向的关系：你做 caption 强化前，需要知道强基座如何处理长时音频、复杂语义和推理链路。
- 可借鉴点：长音频建模 recipe、任务混训、reasoning-oriented instruction tuning、系统级 ablation 组织。
- 推荐优先级：B+
- 建议：泛读

## 5. SoundMind: RL-Incentivized Logic Reasoning for Audio-Language Models

- 年份/会议：2025 / EMNLP 2025 Findings
- 链接：[arXiv](https://arxiv.org/abs/2506.12935)
- 关键词：Audio LLM, reinforcement learning, reasoning, verifier, post-training
- 推荐理由：这篇不是 caption 任务，但它是少见把 RL 明确用到 Audio-Language reasoning 提升上的工作，方法迁移价值高。
- 与我当前方向的关系：你现在最缺的不是“有没有 RLHF/GRPO 文献”，而是“Audio 域里 RL 后训练怎么落地”；这篇能补这一块。
- 可借鉴点：奖励构造、推理轨迹优化、audio-domain verifier 思路、RL 目标与感知任务之间的桥接。
- 推荐优先级：B+
- 建议：精读

## 6. CLAIR-A: Leveraging Large Language Models to Judge Audio Captions

- 年份/会议：2024 / OpenReview
- 链接：[OpenReview](https://openreview.net/forum?id=AGgxxPMvB2)
- 关键词：audio caption evaluation, LLM-as-a-judge, reward modeling, caption quality
- 推荐理由：它最直接回答“caption 好坏怎么评”这个问题。对你后续做 GRPO/reward shaping，这比单看生成模型本身更关键。
- 与我当前方向的关系：如果没有稳定的 caption 质量判别信号，GRPO 很容易优化到表面流畅但不忠实的输出；这篇正好补 reward 侧。
- 可借鉴点：LLM judge 维度设计、caption 偏好刻画、自动评估与人工偏好对齐、reward model 原型。
- 推荐优先级：B+
- 建议：精读

## 本周最值得先读的 3 篇

1. `Listening Between the Frames (TimeAudio)`：最直接贴合 Audio LLM 时序建模问题。
2. `AVoCaDO`：最适合借鉴时序化 caption 的输出组织方式。
3. `CLAIR-A`：最适合补 reward / judge / preference signal 设计。

## 建议阅读顺序

1. 先读 `Listening Between the Frames (TimeAudio)` + `Listening with Time`，补时序建模和时间提示。
2. 再读 `AVoCaDO`，看 caption 输出如何做时间编排。
3. 然后读 `CLAIR-A` + `SoundMind`，开始收敛 reward 与 RL 后训练设计。
4. 最后用 `Audio Flamingo 2` 补系统级基线与长音频能力。

## Gmail 正文草稿

主题：每周论文推荐：Audio LLM / GRPO / Caption 方向 - 2026-06-08

本周 Top 推荐：

1. Listening Between the Frames: Bridging Temporal Gaps in Large Audio-Language Models
2. AVoCaDO: An Audiovisual Video Captioner Driven by Temporal Orchestration
3. CLAIR-A: Leveraging Large Language Models to Judge Audio Captions

为什么这 3 篇最重要：

- `Listening Between the Frames (TimeAudio)` 最接近“Audio LLM 的时序化建模”主问题。
- `AVoCaDO` 最适合借鉴“如何把 caption 写成按时间组织的输出”。
- `CLAIR-A` 最适合补齐 GRPO/RLHF 所需的 judge/reward 设计。

与当前研究方向的关系：

- 如果目标是“基于 GRPO 提升 Audio LLM 的 audio caption 能力”，核心不是只找更多 caption paper，而是同时补齐三件事：
- `temporal modeling`：Listening Between the Frames (TimeAudio), Listening with Time
- `structured caption generation`：AVoCaDO
- `reward / preference / judge`：CLAIR-A, SoundMind

阅读建议：

- 精读：Listening Between the Frames (TimeAudio), AVoCaDO, Listening with Time, SoundMind, CLAIR-A
- 泛读：Audio Flamingo 2
- 收藏：无

完整报告见：[`D:\projects\remotion\weekly_paper_recommendation_2026-06-08.md`](D:\projects\remotion\weekly_paper_recommendation_2026-06-08.md)

## 执行状态

- 已更新周报文件。
- 已追加 `recommended_papers.jsonl` 去重记录。
- Gmail 发送未执行：当前会话未暴露可调用的 `send_email`/Gmail 发送工具。
