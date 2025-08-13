import type { AnswerRepository } from '../repositories/answer-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'

const fakeAnswerRepository: AnswerRepository = {
  async create() {},
}

test('Create an Answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toBe('Nova resposta')
})
