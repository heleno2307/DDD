import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
    Notification,
    type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification.js'
import { faker } from '@faker-js/faker'

export function makeNotification(
  overrides: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...overrides,
    },
    id,
  )

  return notification
}
