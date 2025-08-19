import { right, type Either } from '@/core/either.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Notification } from '../../enterprise/entities/notification.js'
import type { NotificationsRepository } from '../repositories/notifications-repository.js'

export interface SendNotificationRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    content,
    recipientId,
    title,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
