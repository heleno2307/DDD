import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { CreateQuestionUseCase } from "./create-question.js"

// Repositório em memória para simular o banco de dados
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe ('Create Question',()=>{

  //Antes de cada teste instanciamos o repositório
  beforeEach(()=>{
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  // system under test sut

  it('should be able to create a question', async () => {

    const { question } = await sut.execute({
      content: 'Nova pergunta',
      authorId: '1',
      title: 'Título da pergunta',
    })

    expect(question.authorId).toBeTruthy()
    expect(question.content).toBe('Nova pergunta')
    expect(question.title).toBe('Título da pergunta')
  })
})