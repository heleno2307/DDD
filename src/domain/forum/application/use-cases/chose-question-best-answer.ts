import { left, right, type Either } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error.js'
import { NotAllowedError } from '@/core/errors/not-allowed-error.js'

interface ChoseQuestionBestAnsweUseCaseRequest {
  answerId: string
  authorId: string
}

type ChoseQuestionBestAnsweUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChoseQuestionBestAnsweUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoseQuestionBestAnsweUseCaseRequest): Promise<ChoseQuestionBestAnsweUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
