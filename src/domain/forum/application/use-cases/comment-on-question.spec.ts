import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.js'

// Repositório em memória para simular o banco de dados
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CommentOnQuestionUseCase

describe('Create Question Comments', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  // system under test sut

  it('should be able to create a question', async () => {
    const question = makeQuestion()
    inMemoryQuestionsRepository.create(question)

    await sut.execute({
      content: 'Novo comentário',
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual(
      'Novo comentário',
    )
  })
})
