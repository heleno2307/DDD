import type { Answer } from "../entities/answer.js";
import type { AnswerRepository } from "../repositories/answer-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";



const fakeAnswerRepository: AnswerRepository = {
  async create(answer: Answer) {
    return;
  },
};

test("Create an Answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    content: "Nova resposta",
    instructorId: "1",
    questionId: "1",
  });

  expect(answer.content).toBe("Nova resposta");
});
