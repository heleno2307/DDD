import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js"
import { makeQuestion } from "test/factories/make-question.js"
import { Slug } from "../../enterprise/entities/value-objects/slug.js"

// Repositório em memória para simular o banco de dados
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase


describe ('Get Question By Slug',()=>{

  //Antes de cada teste instanciamos o repositório
  beforeEach(()=>{
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  // system under test sut

  it('should be able to get a question by slug', async () => {

    const newQuestion = makeQuestion({
        slug: Slug.create("titulo-da-pergunta")
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'titulo-da-pergunta',
    })

    expect(question).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]?.slug).toEqual(newQuestion.slug)
  })
})