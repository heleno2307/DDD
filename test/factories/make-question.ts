import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...overrides,
    },
    id,
  )

  return question
}
