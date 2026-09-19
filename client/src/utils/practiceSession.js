const mockInterviewKeywords = {
  'Tell me about yourself and your technical background.': [
    'background',
    'experience',
    'skills',
    'projects',
    'teamwork',
    'problem solving',
  ],
  'What is React and why do you use it?': [
    'react',
    'components',
    'user interface',
    'state',
    'rendering',
    'reusable',
  ],
  'What is the difference between let, const and var?': [
    'let',
    'const',
    'var',
    'scope',
    'reassign',
    'hoisting',
  ],
  'What is an API and how does a frontend application use it?': [
    'api',
    'frontend',
    'request',
    'response',
    'data',
    'fetch',
  ],
  'Why should we hire you for this position?': [
    'skills',
    'experience',
    'impact',
    'learning',
    'team',
    'problems',
  ],
}

export function evaluatePracticeAnswer(question, userAnswer) {
  if (!question) {
    return {
      correct: false,
      message: 'There is no active question to evaluate.',
      matchedKeywords: [],
      coverage: 0,
      suggestion: 'Try answering with the key concepts from the prompt.',
    }
  }

  const normalizedAnswer = (userAnswer || '').trim()

  if (!normalizedAnswer) {
    return {
      correct: false,
      message: 'Please write a clear answer before submitting it.',
      matchedKeywords: [],
      coverage: 0,
      suggestion: 'Use the core technical idea and one example.',
    }
  }

  const answerText = normalizedAnswer.toLowerCase()
  const expectedKeywords = (question.answer || '')
    .toLowerCase()
    .replace(/[.,!?]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 4)

  const uniqueKeywords = [...new Set(expectedKeywords)]
  const matchedKeywords = uniqueKeywords.filter((keyword) =>
    answerText.includes(keyword)
  )

  const coverage = uniqueKeywords.length > 0
    ? matchedKeywords.length / uniqueKeywords.length
    : 0

  const isCorrect = matchedKeywords.length >= 2 || coverage >= 0.5

  if (isCorrect) {
    const keyIdeas = matchedKeywords.slice(0, 3).join(', ')

    return {
      correct: true,
      message: `Strong answer! You covered the key concepts: ${keyIdeas}.`,
      matchedKeywords,
      coverage,
      suggestion: 'Keep going with one concrete example or quick comparison.',
    }
  }

  const focusIdeas = uniqueKeywords.slice(0, 3).join(', ')

  return {
    correct: false,
    message: `You are close. Try to include at least two key ideas such as ${focusIdeas}.`,
    matchedKeywords,
    coverage,
    suggestion: `Use the idea of ${question.hint || 'scope and behavior'} in your answer.`,
  }
}

export function evaluateMockAnswer(question, userAnswer) {
  if (!question) {
    return {
      correct: false,
      score: 0,
      percentage: 0,
      matchedKeywords: [],
      coverage: 0,
      message: 'There is no question to evaluate yet.',
    }
  }

  const normalizedAnswer = (userAnswer || '').trim()

  if (!normalizedAnswer) {
    return {
      correct: false,
      score: 0,
      percentage: 0,
      matchedKeywords: [],
      coverage: 0,
      message: 'Please answer the question with a clear, technical response.',
    }
  }

  const keywords = mockInterviewKeywords[question] || [
    'experience',
    'skills',
    'team',
    'problem',
    'results',
  ]

  const answerText = normalizedAnswer.toLowerCase()
  const matchedKeywords = keywords.filter((keyword) =>
    answerText.includes(keyword.toLowerCase())
  )

  const coverage = keywords.length > 0
    ? matchedKeywords.length / keywords.length
    : 0

  const wordCount = normalizedAnswer.split(/\s+/).length
  const score = Math.min(
    100,
    Math.max(
      0,
      Math.round((coverage * 65) + Math.min(wordCount, 25) / 25 * 25 + (matchedKeywords.length >= 2 ? 10 : 0))
    )
  )

  const isStrong = score >= 70 || coverage >= 0.5

  return {
    correct: isStrong,
    score,
    percentage: score,
    matchedKeywords,
    coverage,
    message: isStrong
      ? 'Strong answer. Your response showed clear, relevant interview points.'
      : 'Good start. Add a few more concrete examples and technical points to strengthen the answer.',
  }
}

export function summarizeMockInterview(questions = [], answers = []) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return {
      averageScore: 0,
      completion: 0,
      answeredCount: 0,
      totalQuestions: 0,
      strongAnswers: 0,
    }
  }

  let totalScore = 0
  let answeredCount = 0
  let strongAnswers = 0

  questions.forEach((question, index) => {
    const answer = answers[index] || ''
    const evaluation = evaluateMockAnswer(question, answer)

    totalScore += evaluation.score

    if (answer.trim()) {
      answeredCount += 1
    }

    if (evaluation.correct) {
      strongAnswers += 1
    }
  })

  const totalQuestions = questions.length
  const averageScore = Math.round(totalScore / totalQuestions)
  const completion = Math.round((answeredCount / totalQuestions) * 100)

  return {
    averageScore,
    completion,
    answeredCount,
    totalQuestions,
    strongAnswers,
  }
}

export function getNextQuestion(questions, currentQuestion) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null
  }

  if (questions.length === 1) {
    return questions[0]
  }

  let nextQuestion = questions[Math.floor(Math.random() * questions.length)]

  while (
    currentQuestion &&
    nextQuestion.id === currentQuestion.id
  ) {
    nextQuestion = questions[Math.floor(Math.random() * questions.length)]
  }

  return nextQuestion
}
