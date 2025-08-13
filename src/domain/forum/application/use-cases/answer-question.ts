import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import { Answer } from '../../enterprise/entities/answer.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}
