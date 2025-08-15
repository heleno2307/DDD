import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
    type QuestionCommentProps,
    QuestionComment,
} from '@/domain/forum/enterprise/entities/question-comment.js'

import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  overrides: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )

  return questionComment
}
