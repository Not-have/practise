import type {
  GalaxyItem
} from "./types";

export const galaxyData: GalaxyItem[] = [
  {
    id: "ai",
    name: "人工智能星系",
    color: "#9fb8ff",
    position: [0, 0.2, 0],
    summary: "从模型、数据、生成能力到应用场景，逐步探索 AI 的知识宇宙。",
    planets: [
      {
        id: "language",
        name: "机器语言理解星球",
        color: "#45f5d8",
        radius: 1.8,
        summary: "理解文本、语音、语义和对话，是 AI 学习旅程的第一颗核心星球。",
        previewTitle: "机器怎样认识文字？",
        tasks: [
          {
            id: "language-1",
            title: "什么是自然语言理解？",
            description: "认识机器如何把人类语言转成可计算的信息。",
            status: "done"
          },
          {
            id: "language-2",
            title: "AI 如何理解上下文？",
            description: "观察模型如何结合前后文判断真实意图。",
            status: "active"
          },
          {
            id: "language-3",
            title: "对话系统如何保持记忆？",
            description: "了解多轮对话、上下文窗口和记忆策略。",
            status: "locked"
          }
        ]
      },
      {
        id: "gen-ai",
        name: "生成式人工智能星球",
        color: "#f043c8",
        radius: 1.25,
        summary: "探索 AI 如何生成文字、图片、声音和多模态内容。",
        previewTitle: "什么是生成式人工智能？",
        tasks: [
          {
            id: "gen-1",
            title: "AI 怎样生成一张图片？",
            description: "从提示词、扩散模型到图像生成流程。",
            status: "done"
          },
          {
            id: "gen-2",
            title: "AI 怎样生成声音和音乐？",
            description: "理解音频生成、风格控制和内容约束。",
            status: "active"
          },
          {
            id: "gen-3",
            title: "什么是提示词？",
            description: "学习如何用结构化表达引导模型输出。",
            status: "locked"
          },
          {
            id: "gen-4",
            title: "为什么不同提示词结果不同？",
            description: "观察模型随机性、采样参数和语义权重。",
            status: "locked"
          }
        ]
      },
      {
        id: "robotics",
        name: "机器学习规律星球",
        color: "#7c5cff",
        radius: 0.95,
        summary: "从数据、训练、评估到迭代，理解机器学习的基础规律。",
        previewTitle: "什么是数据训练？",
        tasks: [
          {
            id: "ml-1",
            title: "模型为什么需要训练？",
            description: "理解数据、参数和学习过程之间的关系。",
            status: "active"
          },
          {
            id: "ml-2",
            title: "什么是过拟合？",
            description: "学习模型泛化能力和真实效果评估。",
            status: "locked"
          }
        ]
      },
      {
        id: "robot",
        name: "智能机器人星球",
        color: "#8ca4b7",
        radius: 1.05,
        summary: "连接感知、规划和行动，观察智能体如何在现实世界完成任务。",
        previewTitle: "机器人和普通机器有什么不同？",
        tasks: [
          {
            id: "robot-1",
            title: "机器人如何感知世界？",
            description: "认识传感器、视觉识别和环境建模。",
            status: "active"
          },
          {
            id: "robot-2",
            title: "机器人如何规划动作？",
            description: "了解路径规划、任务分解和执行反馈。",
            status: "locked"
          }
        ]
      }
    ]
  },
  {
    id: "science",
    name: "综合科学星系",
    color: "#7ee7ff",
    position: [-5.5, -2.5, -1],
    summary: "物理、生物、数学和逻辑推理交织成一片探索星域。",
    planets: [
      {
        id: "physics",
        name: "物理规律星球",
        color: "#ffb86b",
        radius: 1.2,
        summary: "从力、运动、电磁到宇宙尺度，建立科学直觉。",
        previewTitle: "为什么物体会运动？",
        tasks: [
          {
            id: "physics-1",
            title: "为什么物体会运动？",
            description: "认识力和运动状态之间的关系。",
            status: "active"
          }
        ]
      }
    ]
  },
  {
    id: "humanity",
    name: "文史星系",
    color: "#ffd9a1",
    position: [5.6, -1.6, -0.5],
    summary: "用故事、历史和人物关系理解文明如何发展。",
    planets: [
      {
        id: "history",
        name: "文明时间星球",
        color: "#ff7b9c",
        radius: 1.1,
        summary: "沿着时间线观察事件、人物和时代结构。",
        previewTitle: "历史事件如何互相影响？",
        tasks: [
          {
            id: "history-1",
            title: "历史事件如何互相影响？",
            description: "从因果关系理解历史发展。",
            status: "active"
          }
        ]
      }
    ]
  }
];
