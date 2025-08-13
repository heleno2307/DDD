import type { Question } from "../../enterprise/entities/question.js";


export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
