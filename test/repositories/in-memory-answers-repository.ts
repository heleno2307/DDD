import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)
    return answer || null
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return answers
  }

  async save(answer: Answer) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )
    if (index !== -1) {
      this.items[index] = answer
    }
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== answer.id.toString(),
    )
  }
}
