import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments.js'
import { makeAnswer } from 'test/factories/make-answer.js'

// Repositório em memória para simular o banco de dados
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create Answer Comments', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  // system under test sut

  it('should be able to create a answer', async () => {
    const answer = makeAnswer()
    inMemoryAnswersRepository.create(answer)

    await sut.execute({
      content: 'Novo comentário',
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual(
      'Novo comentário',
    )
  })
})
