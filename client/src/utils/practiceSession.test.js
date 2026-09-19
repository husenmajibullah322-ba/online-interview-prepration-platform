import test from 'node:test'
import assert from 'node:assert/strict'

import {
  evaluateMockAnswer,
  evaluatePracticeAnswer,
  getNextQuestion,
} from './practiceSession.js'

const sampleQuestion = {
  id: 1,
  category: 'JavaScript',
  difficulty: 'Medium',
  question: 'What is the difference between let and var?',
  answer:
    'let is block scoped while var is function scoped and hoisted, which can cause confusing behavior in larger code.',
  hint: 'Think about scope and hoisting.',
}

test('marks a strong answer as correct', () => {
  const result = evaluatePracticeAnswer(
    sampleQuestion,
    'let is block scoped while var is function scoped, and var gets hoisted, which can cause issues in large code.'
  )

  assert.equal(result.correct, true)
  assert.ok(result.matchedKeywords.length >= 2)
  assert.match(result.message, /strong|key concepts|correct/i)
})

test('gives helpful feedback when the answer is weak', () => {
  const result = evaluatePracticeAnswer(sampleQuestion, 'they are different')

  assert.equal(result.correct, false)
  assert.match(result.message, /at least|key concepts|scope|hoist/i)
})

test('returns a different question to avoid repetition', () => {
  const questions = [
    sampleQuestion,
    {
      ...sampleQuestion,
      id: 2,
      question: 'What is a closure in JavaScript?',
      answer: 'A closure is a function that remembers variables from its outer scope.',
    },
  ]

  const next = getNextQuestion(questions, sampleQuestion)

  assert.notEqual(next.id, sampleQuestion.id)
})

test('scores a focused mock answer with clear technical coverage', () => {
  const result = evaluateMockAnswer(
    'What is React and why do you use it?',
    'React is a JavaScript library for building user interfaces with reusable components, state management, and a clear rendering model.'
  )

  assert.equal(result.score >= 70, true)
  assert.ok(result.matchedKeywords.length >= 2)
  assert.match(result.message, /strong|clear|good|focused/i)
})
