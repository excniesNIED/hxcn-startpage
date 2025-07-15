// 计算机与互联网行业常用搜索建议词典 (增强版)
export default [
  // === 编程语言与框架 (Programming Languages & Frameworks) ===
  'JavaScript', 'JS', 'TypeScript', 'TS', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift', 'Dart', 'Scala', 'Perl', 'Shell', 'SQL', 'NoSQL', 'R', 'MATLAB', 'Julia',
  // JS生态 (JS Ecosystem)
  'Vue', 'Vue.js', 'React', 'React.js', 'Angular', 'Svelte', 'SolidJS', 'jQuery', 'Next.js', 'Nuxt.js', 'Gatsby', 'Remix',
  'Vite', 'Webpack', 'Babel', 'Rollup', 'esbuild', 'Parcel', // NEW: 构建工具
  'Jest', 'Vitest', 'Cypress', 'Playwright', 'Mocha', // NEW: 测试框架
  'Redux', 'Zustand', 'Pinia', 'Jotai', 'Recoil', // NEW: 状态管理
  'Radix UI', 'Shadcn/UI', // NEW: 新兴UI库
  // 后端框架 (Backend Frameworks)
  'Node.js', 'Deno', 'Express', 'NestJS', 'Koa', 'Spring', 'Spring Boot', 'Quarkus', 'Micronaut', // NEW
  'Django', 'Flask', 'FastAPI', 'Tornado', // NEW
  'Ruby on Rails', 'Laravel', 'Symfony', // NEW
  'Gin', 'Echo', 'Fiber', 'Chi', // NEW: Go框架
  'ASP.NET', '.NET',
  'Actix-web', 'Axum', 'Tauri', // NEW: Rust框架
  // 移动端与桌面端 (Mobile & Desktop)
  'Flutter', 'React Native', 'SwiftUI', 'Jetpack Compose', 'Xamarin', 'Ionic', 'Electron', // NEW: SwiftUI, Jetpack Compose
  // AI框架 (AI Frameworks)
  'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'LangChain', 'LlamaIndex', // NEW: LangChain, LlamaIndex
  'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', // NEW: Python数据科学生态

  // === 前端开发 (Frontend Development) ===
  'HTML', 'HTML5', 'CSS', 'CSS3', 'SCSS', 'Sass', 'Less', 'PostCSS', // NEW
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'MUI', 'Ant Design', 'Element UI', 'Vuetify',
  'UI', 'UX', 'UI/UX', '用户界面', '用户体验', '前端', 'frontend', '前端开发', 'frontend development',
  'PWA', 'Progressive Web App', 'SPA', 'Single Page Application', 'MPA', 'Multi-Page Application', // NEW
  'SSR', 'Server Side Rendering', 'CSR', 'Client Side Rendering', 'SSG', 'Static Site Generation', 'ISR', 'Incremental Static Regeneration', // NEW
  'WebAssembly', 'WASM', 'WebGL', 'Three.js', 'D3.js', 'ECharts', '可视化', '数据可视化',

  // === 后端开发 (Backend Development) ===
  'API', 'REST', 'RESTful API', 'GraphQL', 'gRPC', 'WebSocket', 'WebRTC', // NEW
  '微服务', 'microservices', 'Serverless', '无服务', 'Faas', '函数即服务',
  '身份验证', 'Authentication', '授权', 'Authorization', 'OAuth', 'JWT', 'JSON Web Token', 'OpenID Connect', 'OIDC', 'SAML', // NEW
  'BFF', 'Backend for Frontend',
  '后端', 'backend', '后端开发', 'backend development', '全栈', 'fullstack',

  // === 数据库与缓存 (Databases & Caching) ===
  'MongoDB', 'MySQL', 'PostgreSQL', 'Postgres', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'MariaDB', 'Elasticsearch', 'Memcached',
  'Cassandra', 'CouchDB', 'Neo4j', 'InfluxDB', 'ClickHouse', 'TimescaleDB',
  'Pinecone', 'Milvus', 'Weaviate', '向量数据库', 'vector database', // NEW: 向量数据库
  '数据库', 'database', '缓存', 'cache', 'ORM', 'Object-Relational Mapping', 'SQL', 'NoSQL', 'NewSQL', // NEW
  '数据仓库', 'data warehouse', '数据湖', 'data lake', '数据湖仓一体', 'lakehouse', // NEW
  'ETL', 'Extract Transform Load', // NEW

  // === 云服务与平台 (Cloud Services & Platforms) ===
  'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud', 'GCP', 'Firebase', 'Netlify', 'Vercel', 'Heroku', 'DigitalOcean', 'Linode', 'Render', 'Cloudflare', // NEW
  '腾讯云', 'Tencent Cloud', '阿里云', 'Alibaba Cloud', '华为云', 'Huawei Cloud', '金山云', 'Kingsoft Cloud', '百度智能云', 'Baidu AI Cloud',
  '云计算', 'cloud computing', '边缘计算', 'edge computing', 'IaaS', 'PaaS', 'SaaS', 'FaaS', 'CaaS', // NEW
  'CDN', 'Content Delivery Network', '内容分发网络', '负载均衡', 'load balancing', '虚拟化', 'virtualization', '容器化', 'containerization',

  // === DevOps 与工具 (DevOps & Tools) ===
  'Docker', 'Kubernetes', 'K8s', 'Jenkins', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Gitea',
  'CI/CD', 'Continuous Integration', 'Continuous Delivery', 'Continuous Deployment', '持续集成', '持续交付', '持续部署',
  'Travis CI', 'CircleCI', 'GitHub Actions', 'GitLab CI', 'Argo CD', 'Spinnaker',
  'Nginx', 'Apache', 'PM2', 'Supervisor', 'Linux', 'Ubuntu', 'CentOS', 'Debian', 'Windows Server', 'Alpine Linux', // NEW
  '监控', 'monitoring', '可观测性', 'observability', // NEW
  'Prometheus', 'Grafana', 'Zabbix', 'Nagios', 'Datadog', 'OpenTelemetry', // NEW
  '日志', 'logging', 'ELK Stack', 'Fluentd', 'Logstash', 'Kibana', 'Loki', // NEW
  'Ansible', 'Puppet', 'Chef', 'Terraform', 'Pulumi', 'Packer', 'Helm', 'Istio', // NEW
  'IaC', 'Infrastructure as Code', '基础设施即代码',
  'VPN', 'Virtual Private Network', 'DNS', 'Domain Name System', '域名', 'domain', 'SSL', 'TLS', 'HTTPS', 'HTTP', 'FTP', 'SSH',

  // NEW: === 架构模式与设计理念 (Architectural Patterns & Design Philosophy) ===
  '设计模式', 'Design Patterns', '单例模式', '工厂模式', '观察者模式', '策略模式', '装饰器模式', // NEW: 具体设计模式
  '架构模式', 'Architectural Patterns', '单体架构', 'Monolithic Architecture', '分层架构', 'Layered Architecture', // NEW
  '微服务架构', 'Microservices Architecture', '事件驱动架构', 'Event-Driven Architecture', 'EDA', // NEW
  'CQRS', 'Command Query Responsibility Segregation', '命令查询职责分离', // NEW
  'DDD', 'Domain-Driven Design', '领域驱动设计', // NEW
  'Event Sourcing', '事件溯源', // NEW
  '云原生', 'Cloud Native', '12要素应用', 'The Twelve-Factor App', // NEW

  // === 计算机科学基础与算法 (CS Fundamentals & Algorithms) ===
  '算法', 'suanfa', 'Algorithm', '数据结构', 'shuju jiegou', 'Data Structure', '操作系统原理', 'Operating System Principles', '计算机网络', 'Computer Network', '计算机组成原理', 'Computer Architecture', '编译原理', 'Compiler Principles',
  // 具体数据结构 (Specific Data Structures)
  '数组', 'Array', '链表', 'Linked List', '栈', 'Stack', '队列', 'Queue', '哈希表', 'Hash Table', '树', 'Tree', '二叉树', 'Binary Tree', '红黑树', 'Red-Black Tree', 'B树', 'B-Tree', '图', 'Graph', '堆', 'Heap', 'Trie树', '字典树', '布隆过滤器', 'Bloom Filter', // NEW
  // 具体算法 (Specific Algorithms)
  '排序算法', 'Sorting Algorithm', '冒泡排序', '选择排序', '插入排序', '归并排序', '快速排序', '堆排序', // NEW
  '搜索算法', 'Searching Algorithm', '二分查找', 'Binary Search', '广度优先搜索', 'BFS', '深度优先搜索', 'DFS', // NEW
  '动态规划', 'Dynamic Programming', 'DP', '贪心算法', 'Greedy Algorithm', '分治算法', 'Divide and Conquer', // NEW
  'Dijkstra算法', 'A*算法', // NEW: 图算法
  'KMP算法', 'Raft算法', 'Paxos算法', // NEW: 字符串匹配与共识算法

  // === 人工智能与数据科学 (Artificial Intelligence & Data Science) ===
  '人工智能', 'rengong zhineng', 'AI', '机器学习', 'jixie xuexi', 'Machine Learning', 'ML', '深度学习', 'shendu xuexi', 'Deep Learning', 'DL',
  '自然语言处理', 'ziran yuyan chuli', 'Natural Language Processing', 'NLP', '计算机视觉', 'jisuanji shijue', 'Computer Vision', 'CV',
  '大模型', 'Large Model', 'LLM', 'Large Language Model', '大语言模型', '生成式AI', 'Generative AI', 'AIGC', 'AI Generated Content', 'AGI', 'Artificial General Intelligence', '通用人工智能', 'RAG', 'Retrieval-Augmented Generation', // NEW
  '数据科学', 'data science', '大数据', 'big data', '数据分析', 'data analysis', '数据挖掘', 'data mining', 'Apache Spark', 'Apache Hadoop', 'Apache Kafka', // NEW
  '神经网络', 'Neural Network', 'NN', '卷积神经网络', 'CNN', '循环神经网络', 'RNN', 'Transformer', 'GAN', '对抗生成网络',
  '推荐系统', 'recommendation system', '知识图谱', 'knowledge graph', '语音识别', 'speech recognition', '图像识别', 'image recognition',
  '强化学习', 'Reinforcement Learning', 'RL', '监督学习', 'Supervised Learning', '无监督学习', 'Unsupervised Learning', '迁移学习', 'Transfer Learning', // NEW
  '模型压缩', 'Model Compression', '模型蒸馏', 'Model Distillation', '剪枝', 'Pruning', '量化', 'Quantization', // NEW
  // 具体模型/技术 (Specific Models/Tech)
  'AlexNet', 'VGG', 'GoogLeNet', 'ResNet', 'BERT', 'GPT', 'GPT-3', 'GPT-4', 'Stable Diffusion', 'Midjourney', // NEW

  // NEW: === 里程碑式AI论文 (Landmark AI Papers) ===
  'Attention Is All You Need', // Transformer
  'ImageNet Classification with Deep Convolutional Neural Networks', // AlexNet
  'Deep Residual Learning for Image Recognition', // ResNet

  'Generative Adversarial Nets', // GAN
  'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', // BERT

  // === 网络安全 (Cybersecurity) ===
  '网络安全', 'cybersecurity', '信息安全', 'information security', '渗透测试', 'penetration testing', '漏洞', 'vulnerability', '攻防', 'attack and defense',
  '加密', 'encryption', '解密', 'decryption', '防火墙', 'firewall', '杀毒软件', 'antivirus software', 'WAF', 'Web Application Firewall', // NEW
  '木马', 'Trojan', '病毒', 'virus', '蠕虫', 'worm', '勒索软件', 'ransomware', '钓鱼', 'phishing',
  'DDoS攻击', 'DDoS attack', 'SQL注入', 'SQL injection', 'XSS', 'Cross-Site Scripting', 'CSRF', 'Cross-Site Request Forgery',
  '安全审计', 'security audit', '安全合规', 'security compliance', 'GDPR', 'HIPAA', '零信任', 'Zero Trust', // NEW

  // === 区块链与新兴技术 (Blockchain & Emerging Tech) ===
  '区块链', 'qukuailian', 'Blockchain', '加密货币', 'cryptocurrency', '比特币', 'Bitcoin', 'BTC', '以太坊', 'Ethereum', 'ETH',
  'Web3', '去中心化', 'decentralization', 'NFT', 'Non-Fungible Token', '非同质化代币',
  'DeFi', 'Decentralized Finance', 'DAO', 'Decentralized Autonomous Organization',
  '智能合约', 'Smart Contract', 'Solidity', '共识算法', 'Consensus Algorithm', '工作量证明', 'Proof of Work', 'PoW', '权益证明', 'Proof of Stake', 'PoS', // NEW
  'ERC-20', 'ERC-721', // NEW: 以太坊标准
  '元宇宙', 'yuan yuzhou', 'Metaverse', 'VR', 'Virtual Reality', '虚拟现实', 'AR', 'Augmented Reality', '增强现实', 'XR', 'Extended Reality',
  '物联网', 'wulianwang', 'IoT', 'Internet of Things', '数字孪生', 'digital twin',
  '量子计算', 'quantum computing', '生物信息学', 'bioinformatics',

  // ... (其余部分保留原样，因为已经非常全面了)
  // === 软件工程与项目管理 (Software Engineering & Project Management) ===
  '敏捷开发', 'Agile development', 'Scrum', '看板', 'Kanban', '项目管理', 'project management',
  '软件测试', 'software testing', '单元测试', 'unit testing', '集成测试', 'integration testing', '端到端测试', 'end-to-end testing', 'TDD', 'Test-Driven Development', // NEW
  '性能优化', 'performance optimization', '代码规范', 'code style', '代码审查', 'code review',
  '版本控制', 'version control', '代码托管', 'code hosting', '代码生成', 'code generation',
  '低代码', 'low code', '无代码', 'no code',
  '架构设计', 'architecture design', '高并发', 'high concurrency', '高可用', 'high availability', '可伸缩性', 'scalability',

  // === 设计、产品与协作 (Design, Product & Collaboration) ===
  'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'Axure', 'Zeplin', 'Miro',
  'Jira', 'Trello', 'Notion', 'Asana', 'ClickUp',
  'Slack', 'Microsoft Teams', '飞书', 'Feishu', '企业微信', 'WeChat Work', '钉钉', 'DingTalk',
  '产品经理', 'Product Manager', 'PM', '产品设计', 'product design', '用户研究', 'user research',

  // === 常用技术概念与职位 (Common Tech Concepts & Roles) ===
  '程序员', 'programmer', '工程师', 'engineer', '开发者', 'developer',
  '软件工程师', 'Software Engineer', '前端工程师', 'Frontend Engineer', '后端工程师', 'Backend Engineer', '全栈工程师', 'Fullstack Engineer',
  '数据分析师', 'Data Analyst', '数据科学家', 'Data Scientist', '机器学习工程师', 'ML Engineer',
  'DevOps工程师', 'DevOps Engineer', '测试工程师', 'QA Engineer', '安全工程师', 'Security Engineer',
  '技术总监', 'CTO', 'CEO', '创始人', 'Founder', '创业', 'startup',
  '远程办公', 'remote work', '内推', 'internal referral', '面试', 'interview', '简历', 'resume',
  'Bug', '错误', 'Error', '调试', 'debug', '性能', 'performance', '吞吐量', 'throughput', '延迟', 'latency',
  '文档', 'documentation', '开源', 'open source', '社区', 'community', '贡献', 'contribution',

  // === 热门网站、社区与服务 (Popular Websites, Communities & Services) ===
  '知乎', 'zhihu', 'B站', 'bilibili', 'bilibili', 'CSDN', 'csdn', '掘金', 'juejin', '思否', 'segmentfault', '慕课网', 'imooc', '极客时间', 'geekbang',
  'Stack Overflow', 'stackoverflow', 'Reddit', 'reddit', 'Twitter', 'twitter', 'X', 'GitHub', 'github', 'LinkedIn', 'linkedin', 'Hacker News', // NEW
  '微信', 'weixin', 'QQ', 'qq', '淘宝', 'taobao', '京东', 'jingdong', '豆瓣', 'douban', '小红书', 'xiaohongshu',
  '百度', 'baidu', '谷歌', 'google', '微软', 'microsoft', '苹果', 'apple', '亚马逊', 'amazon', 'Meta', 'NVIDIA', // NEW
  '微博', 'weibo', '字节跳动', 'ByteDance', '美团', 'meituan', '滴滴', 'didi',
  '阿里', 'alibaba', '腾讯', 'tencent', '华为', 'huawei', '小米', 'xiaomi',

  // === 个人发展与职业 (Personal Development & Career) ===
  '职业规划', 'career planning', '学习路线', 'learning roadmap', '技术趋势', 'tech trends', '行业报告', 'industry report',
  '薪资', 'salary', '涨薪', 'raise', '跳槽', 'job hopping', '内卷', 'involution', '996', '007',
]