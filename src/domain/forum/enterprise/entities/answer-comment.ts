import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Optional } from '@/core/types/optional.js'
import { Comment, type CommentProps } from './comment.js'

export interface AnswerCommentProp extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProp> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProp, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answerComment
  }
}
