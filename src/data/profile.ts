// 个人信息集中在这里维护。标记为 TODO / placeholder 的内容请替换成真实信息。

export const profile = {
  name: '孙志翔',
  nameEn: 'Zhixiang Sun',
  handle: 'sungump',
  pitch: '机器人 / 具身智能方向的 C++ 工程师，关注 ROS 2、嵌入式与 AI 应用落地。',
  status: '广东工业大学 · 人工智能 硕士在读（2027.06 毕业）· 正在寻找 2027 届校招机会',
  targets: ['机器人 / 具身智能 C++（ROS 2）', '嵌入式开发', 'AI 应用开发'],
  github: 'https://github.com/sungump',
  // TODO: 替换为真实邮箱
  email: 'TODO@example.com',
  // TODO: 把简历 PDF 放到 public/resume.pdf 后，改成 '/resume.pdf'；为空时页面显示“待上传”占位
  resumeUrl: '',
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  // TODO: 补充每段实习的具体工作内容与成果
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: '广汽研究院',
    role: 'AI 开发实习生',
    period: '2026.06 – 2026.08',
    highlights: ['TODO：补充主要工作内容（负责的模块 / 使用的技术 / 量化成果）'],
    tags: ['AI 应用'],
  },
  {
    company: '足下科技',
    role: 'C++ 实习生',
    period: '2026.03 – 2026.06',
    highlights: ['TODO：补充主要工作内容（负责的模块 / 使用的技术 / 量化成果）'],
    tags: ['C++'],
  },
];

export interface Project {
  title: string;
  summary: string;
  tags: string[];
  category: 'robotics' | 'ai';
  repo?: string;
  demo?: string;
  placeholder?: boolean;
}

// 以下项目均为占位示例（placeholder: true），请替换为真实项目后删除该字段。
export const projects: Project[] = [
  {
    title: '示例项目：ROS 2 移动机器人导航',
    summary: 'TODO：一句话描述项目目标、你的职责与结果。例如基于 Nav2 的建图与路径规划实践。',
    tags: ['ROS 2', 'C++', 'Nav2'],
    category: 'robotics',
    placeholder: true,
  },
  {
    title: '示例项目：机械臂运动控制节点',
    summary: 'TODO：描述项目内容，例如 rclcpp 控制节点、MoveIt 2 规划、实时性优化等。',
    tags: ['ROS 2', 'C++', 'MoveIt 2'],
    category: 'robotics',
    placeholder: true,
  },
  {
    title: '示例项目：嵌入式传感器数据采集',
    summary: 'TODO：描述项目内容，例如 MCU 驱动、通信协议、与上位机 / ROS 2 的桥接。',
    tags: ['Embedded', 'C/C++'],
    category: 'robotics',
    placeholder: true,
  },
  {
    title: '示例项目：大模型 AI 应用',
    summary: 'TODO：描述项目内容，例如基于 LLM 的问答 / Agent 应用、RAG、部署与评测。',
    tags: ['LLM', 'Python', 'AI 应用'],
    category: 'ai',
    placeholder: true,
  },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

// TODO: 按实际掌握情况增删
export const skills: SkillGroup[] = [
  { name: '编程语言', items: ['C++', 'TODO'] },
  { name: '机器人', items: ['ROS 2', 'TODO'] },
  { name: '嵌入式', items: ['TODO'] },
  { name: 'AI', items: ['TODO'] },
  { name: '工具', items: ['TODO'] },
];
