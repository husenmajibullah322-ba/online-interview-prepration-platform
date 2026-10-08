export const mockQuestions = [
  'Tell me about yourself and your technical background.',
  'What is React and why do you use it?',
  'What is the difference between let, const and var?',
  'What is an API and how does a frontend application use it?',
  'Why should we hire you for this position?',
]

export const practiceQuestions = [
  {
    id: 1,
    category: 'JavaScript',
    difficulty: 'Medium',
    hint: 'Focus on scope and reassignment.',
    question:
      'What is the difference between let, const and var in JavaScript?',
    answer:
      'let and const are block-scoped, while var is function-scoped. A let variable can be reassigned, const cannot be reassigned, and var can be redeclared.',
  },
  {
    id: 2,
    category: 'React',
    difficulty: 'Easy',
    hint: 'Think about UI building and component architecture.',
    question: 'What is React?',
    answer:
      'React is a JavaScript library used for building user interfaces, especially component-based web applications.',
  },
  {
    id: 3,
    category: 'APIs',
    difficulty: 'Easy',
    hint: 'Focus on communication between systems.',
    question: 'What is an API?',
    answer:
      'An API is a way for different software applications to communicate and exchange data with each other.',
  },
  {
    id: 4,
    category: 'Databases',
    difficulty: 'Easy',
    hint: 'Think about document-oriented storage.',
    question: 'What is MongoDB?',
    answer:
      'MongoDB is a NoSQL database that stores data in flexible JSON-like documents.',
  },
  {
    id: 5,
    category: 'JavaScript',
    difficulty: 'Easy',
    hint: 'Think about frontend and interactivity.',
    question: 'What is JavaScript?',
    answer:
      'JavaScript is a programming language commonly used to make web pages interactive and dynamic.',
  },
  {
    id: 6,
    category: 'Web',
    difficulty: 'Medium',
    hint: 'Think about page structure and browser access.',
    question: 'What is the DOM?',
    answer:
      'DOM stands for Document Object Model. It represents an HTML document as a tree of objects that JavaScript can manipulate.',
  },
]

export const fallbackTracks = [
  {
    name: 'JavaScript fundamentals',
    type: 'Technical',
    progress: 72,
    color: 'coral',
    meta: '18 of 25 lessons',
  },
  {
    name: 'System design basics',
    type: 'Technical',
    progress: 38,
    color: 'teal',
    meta: '6 of 16 lessons',
  },
  {
    name: 'Behavioral interviews',
    type: 'Soft skills',
    progress: 84,
    color: 'gold',
    meta: '21 of 25 lessons',
  },
]
