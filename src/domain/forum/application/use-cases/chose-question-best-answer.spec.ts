import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { ChoseQuestionBestAnsweUseCase } from './chose-question-best-answer.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { makeAnswer } from 'test/factories/make-answer.js'

// Repositório em memória para simular o banco de dados
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChoseQuestionBestAnsweUseCase

describe('Choose Question Best Answer', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChoseQuestionBestAnsweUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  // system under test sut

  it('should be able to chose a question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId).toEqual(
      answer.id,
    )
  })

  it('should not be able to choose a question best answer from another user.', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await expect(
      sut.execute({
        answerId: answer.id.toString(),
        authorId: '<another-user-id>',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
