import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'

// Repositório em memória para simular o banco de dados
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  // system under test sut

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      content: 'Nova resposta',
      questionId: '1',
      instructorId: '1',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)
  })
})
