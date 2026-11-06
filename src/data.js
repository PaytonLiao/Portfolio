import signChan from './assets/sign-chan.png'

const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Payton Liao',
  email: 'payton.liao@gmail.com',
  linkedin: 'https://www.linkedin.com/in/payton-liao/',
  github: 'https://github.com/paytonliao',
  cv: `${BASE}Payton_Liao_CV.pdf`,
  photo: `${BASE}payton_square_photo.jpg`,
  location: 'London, UK',
}

export const experience = [
  {
    id: 'google',
    company: 'Google',
    role: 'Site Reliability Intern',
    period: 'Jun – Sep 2026',
    place: 'Dublin, Ireland',
    metric: { value: 99.8, suffix: '%', label: 'less time to create a config' },
    summary:
      'Multi-agent system inside Google’s internal AI harness that writes configuration files for an internal A/B testing platform.',
    points: [
      'Built a multi-agent system that automates SQL queries, configuration syntax and the choice of statistical functions for A/B test configs.',
      'Developed and evaluated specialised agents with an internal evaluation framework, cutting configuration creation time by 99.8%.',
      'Integrated an evaluation pipeline that backtests against historical evaluations to verify correctness and sensitivity — validation the manual workflow never had.',
    ],
    tags: ['Agentic AI', 'LLMs', 'Evaluation', 'SQL', 'Python'],
    visual: 'agents',
  },
  {
    id: 'mathworks',
    company: 'MathWorks',
    role: 'Gen-AI Research & SWE Intern',
    period: 'Jun – Sep 2025',
    place: 'Cambridge, UK',
    metric: { text: 'Millions', label: 'of engineers use MATLAB Copilot, whose model choice the leaderboard informed' },
    summary:
      'Generative AI Engineering team. A distributed leaderboard for benchmarking open-source foundation models.',
    points: [
      'Designed and deployed a distributed leaderboard that benchmarks open-source foundation models at scale, directly informing model selection for fine-tuning MATLAB Copilot.',
      'Built a full-stack app (FastAPI, React TSX, MariaDB) with a GPU-accelerated vLLM inference pipeline that processes and publishes evaluation metrics in real time.',
      'Reviewed state-of-the-art LLM evaluation methods and leaderboard designs to define the project spec.',
    ],
    tags: ['LLMs', 'Evaluation', 'vLLM', 'FastAPI', 'React', 'Docker'],
    visual: 'leaderboard',
  },
  {
    id: 'ucl-srv',
    company: 'UCL Surgical Robot Vision',
    role: 'Computer Vision Research Intern',
    period: 'Apr – Jun 2025',
    place: 'London, UK',
    metric: { value: 20, suffix: 'k', label: 'images in the dataset I curated' },
    summary:
      'Deep learning for hyperspectral image super-resolution (HSI-SR) in surgical imaging.',
    points: [
      'Designed and implemented two deep learning models for HSI super-resolution, including a novel variant of a state-of-the-art architecture.',
      'Curated and preprocessed a 20,000-image custom dataset; benchmarked against public HSI datasets and beat existing SOTA baselines.',
      'Wrote the literature review and a full research report on method, results and future directions.',
    ],
    tags: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Research'],
    visual: 'spectral',
  },
]

export const projects = [
  {
    id: 'babyrobot',
    title: 'Curious Baby Robot',
    kicker: 'Embodied AI · Research',
    year: '2026',
    blurb:
      'A simulated infant robot that learns its own body schema with no task and no external reward — just curiosity and touch.',
    detail: [
      'Studies how different toddler-like intrinsic behaviours affect the quality of body-schema learning, using the BabyBench / MIMo infant simulator in MuJoCo.',
      'A dual-channel VAE fuses proprioception and touch into a compact latent state; a latent forward model supplies a curiosity signal, and a habituating, diversity-seeking touch reward drives PPO.',
      'Result: behaviour moves from random motor babbling to structured, infant-like self-touch sequences (head and torso first, then lower body). A controlled comparison of random babbling vs goal-directed self-touch measures representation quality with forward-prediction and linear-probe metrics.',
    ],
    stack: ['PyTorch', 'PPO', 'VAE', 'MuJoCo', 'Reinforcement Learning'],
    links: [{ label: 'Code', href: 'https://github.com/paytonliao/babybench_coursework' }],
    filter: ['research', 'robotics'],
    art: 'baby',
    featured: true,
  },
  {
    id: 'signchan',
    title: 'Sign-Chan',
    kicker: '1st place · AI Hackathon London 2024',
    year: '2024',
    blurb:
      'A real-time AI V-Tuber that turns speech into sign language. Won first place out of 100+ participants.',
    detail: [
      'Built in a team at the Encode Club AI Hackathon London: speech goes in, NLP maps it to signs, and an animated V-Tuber avatar signs it back in real time.',
      'OpenCV and MediaPipe track pose and hands from reference signing video to drive the avatar.',
    ],
    stack: ['NLP', 'OpenCV', 'MediaPipe', 'Python'],
    links: [{ label: 'Code', href: 'https://github.com/hhw1101/Sign-Chan' }],
    filter: ['ai'],
    image: signChan,
    badge: '🏆 Winner',
    featured: true,
  },
  {
    id: 'vae',
    title: 'Born-to-Learn VAE',
    kicker: 'Representation learning',
    year: '2026',
    blurb:
      'A memory-lean VAE pipeline that compresses 17,555-dimensional robot touch + proprioception into a latent body state.',
    detail: [
      'Streams episodes lazily from many HDF5 files without loading the dataset into memory, with a deterministic episode-level train/val/test split to avoid timestep leakage.',
      'Normalisation statistics come from training episodes only. Training tracks ELBO, reconstruction and KL in TensorBoard, with early stopping and best-checkpoint restore.',
      'A comparison script evaluates models trained on different behaviour subsets and exports JSON/CSV results.',
    ],
    stack: ['PyTorch', 'VAE', 'HDF5', 'TensorBoard'],
    links: [{ label: 'Code', href: 'https://github.com/paytonliao/UCLBornToLearn_training_and_evaluation' }],
    filter: ['research', 'ai'],
    art: 'vae',
  },
  {
    id: 'gripper',
    title: 'Grasp Lab',
    kicker: 'Robotics · Simulation',
    year: '2024',
    blurb:
      'A PyBullet framework that throws thousands of randomised grasps at objects and learns which ones will hold.',
    detail: [
      'Object-oriented framework (abstract gripper base class, specialised grippers such as a three-finger hand) for running grasp-and-lift experiments with randomised poses.',
      'Trains SVM and feed-forward network classifiers to predict grasp success from 6-DoF pose, with t-SNE and 3D point-cloud views of where grasps succeed.',
    ],
    stack: ['PyBullet', 'Python', 'scikit-learn', 'PyTorch'],
    links: [{ label: 'Code', href: 'https://github.com/paytonliao/OOP_project' }],
    filter: ['robotics', 'ai'],
    art: 'gripper',
  },
  {
    id: 'launcher',
    title: 'Face-Tracking Candy Launcher',
    kicker: 'Hardware · Computer vision',
    year: '2024',
    blurb: 'It finds your face, measures the distance, and fires candy at you. Accurately.',
    detail: [
      'OpenCV face tracking plus a time-of-flight sensor for range, driving motors through Arduino and STM32 microcontrollers.',
      'Aims and launches projectiles at moving targets in real time.',
    ],
    stack: ['C++', 'OpenCV', 'STM32', 'Arduino'],
    links: [{ label: 'Code', href: 'https://github.com/paytonliao/face-tracking_candy_launcher' }],
    filter: ['robotics'],
    art: 'launcher',
  },
  {
    id: 'rescue',
    title: 'Robot Rescue',
    kicker: 'Game · written in C',
    year: 'Year 1',
    blurb:
      'My solo C game about a robot rescuing people on an unknown planet. Burgers give you extra lives. There is a CRAZY mode.',
    detail: [
      'Rescue people and dodge obstacles that multiply as your score climbs. The robot speeds up every five rescues, and the Big Mac gives you an extra life.',
      'The original is written in C. The version here is a small browser remake so you can play it without compiling anything.',
    ],
    stack: ['C', 'Game dev'],
    links: [{ label: 'Code', href: 'https://github.com/paytonliao/Robot_safe_maneuver_game' }],
    filter: ['fun'],
    art: 'game',
    playable: true,
  },
]

export const archive = [
  { title: 'Full-stack Amazon clone', note: 'React · Express · MongoDB · PayPal', href: 'https://github.com/paytonliao/Fullstack_Amazon_clone' },
  { title: 'MERN bookstore', note: 'MongoDB · Express · React · Node', href: 'https://github.com/paytonliao/MERN_bookstore' },
  { title: 'Early React experiments', note: 'Tic-tac-toe, place picker, calculators', href: 'https://github.com/paytonliao?tab=repositories' },
]

// skill -> which experience/project ids use it
export const skills = [
  { group: 'AI & ML', items: [
    { name: 'Agentic AI', used: ['google'] },
    { name: 'LLMs', used: ['google', 'mathworks'] },
    { name: 'LLM evaluation', used: ['google', 'mathworks'] },
    { name: 'Deep learning', used: ['ucl-srv', 'babyrobot', 'vae', 'gripper'] },
    { name: 'Reinforcement learning', used: ['babyrobot'] },
    { name: 'Computer vision', used: ['ucl-srv', 'signchan', 'launcher'] },
    { name: 'Embodied agents', used: ['babyrobot', 'vae'] },
    { name: 'Tactile sensing', used: ['babyrobot', 'vae'] },
  ]},
  { group: 'Code & tools', items: [
    { name: 'Python', used: ['google', 'mathworks', 'ucl-srv', 'babyrobot', 'vae', 'gripper', 'signchan'] },
    { name: 'PyTorch', used: ['ucl-srv', 'babyrobot', 'vae', 'gripper'] },
    { name: 'C / C++', used: ['launcher', 'rescue'] },
    { name: 'OpenCV', used: ['signchan', 'launcher'] },
    { name: 'vLLM', used: ['mathworks'] },
    { name: 'FastAPI + React', used: ['mathworks'] },
    { name: 'Docker', used: ['mathworks'] },
    { name: 'MuJoCo / PyBullet', used: ['babyrobot', 'gripper'] },
  ]},
  { group: 'Research', items: [
    { name: 'Experimental design', used: ['babyrobot', 'ucl-srv'] },
    { name: 'Dataset curation', used: ['ucl-srv', 'vae'] },
    { name: 'Literature review', used: ['ucl-srv', 'mathworks'] },
    { name: 'Scientific writing', used: ['ucl-srv', 'babyrobot'] },
  ]},
]

export const nameOf = (id) =>
  experience.find((e) => e.id === id)?.company ?? projects.find((p) => p.id === id)?.title ?? id
