import type { Question } from '../../enterprise/entities/question.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface ChoseQuestionBestAnsweUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChoseQuestionBestAnsweUseCaseResponse {
  question: Question
}

export class ChoseQuestionBestAnsweUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoseQuestionBestAnsweUseCaseRequest): Promise<ChoseQuestionBestAnsweUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
