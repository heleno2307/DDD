import type { Answer } from '../entities/answer.js'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
