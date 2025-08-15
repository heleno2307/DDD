import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { EditQuestionUseCase } from './edit-question.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

// Repositório em memória para simular o banco de dados
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  // system under test sut

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: 'Updated content',
      title: 'Updated title',
    })

    expect(inMemoryQuestionsRepository.items[0]?.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated title',
      content: 'Updated content',
    })
  })

  it('should not be able to edit a question from another user.', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: '<another-user-id>',
      content: 'Updated content',
      title: 'Updated title',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
