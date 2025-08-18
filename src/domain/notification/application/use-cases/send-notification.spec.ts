import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository.js'
import { SendNotificationUseCase } from './send-notification.js'

// Repositório em memória para simular o banco de dados
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Create Notification', () => {
  // Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  // system under test sut

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      content: 'Nova notificação',
      recipientId: '1',
      title: 'Nova notificação',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
