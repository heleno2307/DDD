import { makeAnswer } from 'test/factories/make-answer.js'
import { OnAnswerCreated } from './on-answer-created.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.js'
import { SendNotificationUseCase } from '../use-cases/send-notification.js'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { type MockInstance } from 'vitest'
import { waitFor } from 'test/utils/waitFor.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance

describe('OnAnswerCreated', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when a new answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    // aguarda a função ser chamada
    await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled())
  })
})
