import type { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(AnswerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(AnswerId: string): Promise<void>
}
