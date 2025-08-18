import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js'
import { left, right, type Either } from '@/core/either.js'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error.js'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
