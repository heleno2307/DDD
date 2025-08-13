import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

import { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    // Criar nova entidade de pergunta
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    // Salva no repositório
    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
