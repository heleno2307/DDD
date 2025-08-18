import type { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository.js'
import type { Notification } from '@/domain/notification/enterprise/entities/notification.js'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  create(notification: Notification) {
    this.items.push(notification)
    return Promise.resolve()
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )
    if (itemIndex !== -1) {
      this.items[itemIndex] = notification
    }
  }
}
