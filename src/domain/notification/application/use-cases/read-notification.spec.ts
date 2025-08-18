import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository.js'
import { ReadNotificationUseCase } from './read-notification.js'
import { makeNotification } from 'test/factories/make-notification.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from '@/core/errors/not-allowed-error.js'

// Repositório em memória para simular o banco de dados
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  // system under test sut

  it('should be able to read a notification', async () => {
    const notification = makeNotification(
      { recipientId: new UniqueEntityID('1') },
      new UniqueEntityID('1'),
    )

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: '1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification(
      { recipientId: new UniqueEntityID('1') },
      new UniqueEntityID('1'),
    )

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: '2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
