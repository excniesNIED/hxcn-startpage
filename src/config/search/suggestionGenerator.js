/**
 * 高级技术搜索建议生成器
 *
 * 本模块通过组合不同类别的关键词，生成大量针对技术问题解决、学术研究和深度学习的搜索建议。
 * 旨在模拟开发者和研究人员在遇到具体问题或探索新领域时的真实搜索行为。
 * 预计生成量级：10,000 - 50,000+ 条。
 */

// ===================================================================================
// I. 基础词条库 (Building Blocks)
// ===================================================================================

// 核心技术与工具 (从上一版精选，并增加更具体的库)
const technologies = [
  'React', 'Vue', 'Angular', 'Svelte', 'SolidJS', 'Next.js', 'Nuxt.js',
  'Node.js', 'Deno', 'Bun', 'Express', 'NestJS', 'Koa',
  'Python', 'Django', 'Flask', 'FastAPI',
  'Java', 'Spring Boot', 'Quarkus', 'Go', 'Gin', 'Rust', 'Actix-web', 'Axum',
  'Docker', 'Kubernetes', 'K8s', 'Terraform', 'Ansible',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'ClickHouse', 'Milvus',
  'AWS S3', 'AWS EC2', 'AWS Lambda', 'Google Cloud Run', 'Azure Functions', 'Cloudflare Workers',
  'Webpack', 'Vite', 'esbuild', 'Babel',
  'TensorFlow', 'PyTorch', 'JAX', 'LangChain', 'LlamaIndex',
  'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV',
  'Git', 'GitHub Actions', 'Jenkins', 'GitLab CI',
  'Nginx', 'Apache Kafka', 'RabbitMQ', 'gRPC', 'GraphQL',
  'CSS', 'HTML', 'JavaScript', 'TypeScript', 'WebAssembly',
];

// 1. 问题解决 & Bug调试 (Problem Solving & Debugging)
const problemPrefixes = ['how to fix', 'how to solve', 'debug', 'troubleshoot', 'why is my', 'what causes'];
const problemNouns = [
  'error', 'bug', 'issue', 'crash', 'exception', 'failure', 'warning', 'not working',
  'memory leak', 'race condition', 'deadlock', 'bottleneck', 'high CPU usage', 'high memory usage',
  'slow performance', 'latency issue', 'timeout', 'connection refused', 'permission denied',
  'segmentation fault', 'stack overflow', 'null pointer exception', 'index out of bounds', 'type error',
  'CORS error', '400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Server Error', '502 Bad Gateway', '504 Gateway Timeout',
  'hydration error', 'chunk loading failed', 'dependency conflict', 'build failed', 'compilation error',
  'environment variable not set', 'configuration error', 'version mismatch',
];

// 2. 实现与操作 (Implementation & Operations)
const actionPrefixes = ['how to', 'best way to', 'implement', 'setup', 'configure', 'install', 'deploy', 'integrate', 'use', 'migrate', 'upgrade', 'connect'];
const actionTargets = [
  'authentication', 'authorization', 'caching', 'logging', 'monitoring', 'testing', 'load balancing',
  'database connection', 'api endpoint', 'websocket', 'serverless function', 'microservice',
  'state management', 'form validation', 'routing', 'ssr', 'ssg', 'ci/cd pipeline',
  'to production', 'on AWS', 'on GCP', 'on Azure', 'with Docker', 'using Kubernetes',
];

// 3. 学习与探索 (Learning & Exploration)
const learningQualifiers = [
  'tutorial', 'guide', 'for beginners', 'advanced tutorial', 'course', 'documentation', 'docs',
  'cheatsheet', 'examples', 'best practices', 'design patterns', 'architecture',
  'use cases', 'interview questions', 'roadmap', 'learning path', 'getting started',
];

// 4. 对比与选型 (Comparison & Alternatives)
const comparisonKeywords = ['vs', 'versus', 'alternative to', 'comparison', 'pros and cons', 'benchmark'];

// 5. 学术与研究 (Academic & Research)
const academicConcepts = [
  'algorithm', 'data structure', 'computational complexity', 'big O notation', 'P vs NP',
  'lambda calculus', 'type theory', 'category theory', 'formal verification',
  'gradient descent', 'stochastic gradient descent', 'adam optimizer', 'backpropagation', 'loss function',
  'bayesian inference', 'markov chain monte carlo', 'mcmc', 'probabilistic graphical models',
  'reinforcement learning from human feedback', 'rlhf', 'self-attention', 'mixture of experts', 'moe',
  'information theory', 'entropy', 'kl divergence', 'fourier transform', 'wavelet transform',
  'statistical significance', 'p-value', 'hypothesis testing', 'ablation study',
  'state-of-the-art', 'sota', 'benchmark', 'dataset', 'literature review', 'survey paper',
];

const academicVenues = [
  // AI/ML
  'NeurIPS', 'ICML', 'ICLR', 'CVPR', 'ACL', 'EMNLP', 'NAACL', 'AISTATS', 'UAI', 'COLT',
  // Systems/Architecture
  'OSDI', 'SOSP', 'ASPLOS', 'ISCA', 'MICRO', 'NSDI',
  // Databases
  'SIGMOD', 'VLDB', 'ICDE',
  // Theory
  'STOC', 'FOCS',
  // Graphics/HCI
  'SIGGRAPH', 'CHI',
  // Security
  'CCS', 'S&P (Oakland)', 'USENIX Security', 'NDSS',
  // Journals
  'JMLR', 'Journal of Machine Learning Research', 'Nature', 'Science', 'IEEE PAMI', 'TNNLS',
];

const academicLabs = [
  'OpenAI', 'DeepMind', 'Meta AI (FAIR)', 'Google Brain', 'Google Research', 'Microsoft Research',
  'Stanford AI Lab (SAIL)', 'MIT CSAIL', 'Berkeley AI Research (BAIR)', 'CMU', 'ETH Zurich',
];

const famousPapers = [
  'Attention Is All You Need', 'BERT Pre-training', 'Generative Adversarial Nets', 'ImageNet Classification',
  'Deep Residual Learning', 'Dota 2 with Large Scale Deep Reinforcement Learning', 'Mastering the game of Go',
  'Adam: A Method for Stochastic Optimization', 'The Unreasonable Effectiveness of Data',
  'MapReduce: Simplified Data Processing on Large Clusters',
];

const aiModelsAndDatasets = [
    'GPT-4', 'GPT-3.5', 'Claude 3', 'Llama 3', 'Mixtral', 'BERT', 'RoBERTa', 'T5',
    'ResNet', 'VGGNet', 'Inception Net', 'YOLO', 'CLIP', 'DALL-E 3', 'Stable Diffusion', 'Midjourney',
    'AlphaGo', 'AlphaFold', 'MuZero',
    'ImageNet', 'COCO Dataset', 'MNIST', 'CIFAR-10', 'CIFAR-100', 'The Pile', 'GLUE Benchmark', 'SuperGLUE',
];

// ===================================================================================
// II. 搜索建议生成器 (Suggestion Generator)
// ===================================================================================

function generateKeywords() {
  const keywords = new Set();

  // Pattern 1: [Technology] + [Problem] -> e.g., "React memory leak", "Kubernetes connection refused"
  for (const tech of technologies) {
    for (const problem of problemNouns) {
      keywords.add(`${tech} ${problem}`);
    }
  }

  // Pattern 2: [Prefix] + [Technology] + [Problem] -> e.g., "how to fix React hydration error"
  for (const prefix of problemPrefixes) {
    for (const tech of technologies) {
      for (const problem of problemNouns.slice(0, 15)) { // Use a subset to keep combinations manageable
        keywords.add(`${prefix} ${tech} ${problem}`);
      }
    }
  }

  // Pattern 3: [Action Prefix] + [Action Target] + in/with [Technology] -> e.g., "how to implement authentication in Next.js"
  for (const aPrefix of actionPrefixes) {
    for (const aTarget of actionTargets) {
      for (const tech of technologies) {
        keywords.add(`${aPrefix} ${aTarget} in ${tech}`);
        keywords.add(`${aPrefix} ${aTarget} with ${tech}`);
      }
    }
  }

  // Pattern 4: [Technology] + [Learning Qualifier] -> e.g., "Python interview questions", "Docker best practices"
  for (const tech of technologies) {
    for (const qualifier of learningQualifiers) {
      keywords.add(`${tech} ${qualifier}`);
    }
  }

  // Pattern 5: [Technology] + [Comparison] + [Technology] -> e.g., "Vite vs Webpack", "PostgreSQL vs MongoDB"
  for (let i = 0; i < technologies.length; i++) {
    for (let j = i + 1; j < technologies.length; j++) {
      // Avoid nonsensical comparisons like "React vs Python" by a simple heuristic (can be improved)
      const t1 = technologies[i];
      const t2 = technologies[j];
      if (t1.length + t2.length < 25) { // Simple filter
        for (const comp of comparisonKeywords) {
          keywords.add(`${t1} ${comp} ${t2}`);
        }
      }
    }
  }

  // Pattern 6: Standalone Academic & Research terms
  academicConcepts.forEach(k => keywords.add(k));
  academicVenues.forEach(k => {
    keywords.add(k);
    keywords.add(`${k} proceedings`);
    keywords.add(`${k} deadline`);
    keywords.add(`${k} call for papers`);
  });
  academicLabs.forEach(k => {
    keywords.add(k);
    keywords.add(`${k} research`);
    keywords.add(`${k} publications`);
  });
  famousPapers.forEach(k => keywords.add(k));
  aiModelsAndDatasets.forEach(k => keywords.add(k));

  // Pattern 7: Academic Concept + in/for [Technology/Field] -> e.g., "bayesian inference in python"
  const fields = ['machine learning', 'computer vision', 'nlp', 'data science', 'reinforcement learning'];
  for (const concept of academicConcepts.slice(0, 20)) {
    for (const field of fields) {
      keywords.add(`${concept} in ${field}`);
    }
    for (const tech of ['Python', 'PyTorch', 'TensorFlow', 'JAX']) {
      keywords.add(`${concept} implementation in ${tech}`);
    }
  }
  
  // Final cleanup and conversion to array
  return Array.from(keywords);
}

// ===================================================================================
// III. 导出 (Export)
// ===================================================================================

// Generate and export the keywords.
const generatedSuggestions = generateKeywords();

// You can log the size to verify
console.log(`Generated ${generatedSuggestions.length} unique search suggestions.`);

export default generatedSuggestions;