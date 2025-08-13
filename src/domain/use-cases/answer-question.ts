import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { Answer } from '../entities/answer.js'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
