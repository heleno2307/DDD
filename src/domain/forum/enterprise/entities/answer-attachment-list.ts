import { WatchedList } from '@/core/entities/watched-list.js'
import { AnswerAttachment } from './answer-attachment.js'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
