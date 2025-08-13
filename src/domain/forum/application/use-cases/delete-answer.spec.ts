import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";

import { DeleteAnswerUseCase } from "./delete-answer.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { makeAnswer } from "test/factories/make-answer.js";

// Repositório em memória para simular o banco de dados
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  //Antes de cada teste instanciamos o repositório
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  // system under test sut

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user.", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "<another-user-id>",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
