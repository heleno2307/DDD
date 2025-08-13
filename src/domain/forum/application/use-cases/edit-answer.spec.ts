import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { EditAnswerUseCase } from './edit-answer.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

// Repositório em memória para simular o banco de dados
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  // system under test sut

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'Updated content',
    })

    expect(inMemoryAnswersRepository.items[0]?.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Updated content',
    })
  })

  it('should not be able to edit a answer from another user.', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: '<another-user-id>',
        content: 'Updated content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
