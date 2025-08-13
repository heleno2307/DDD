import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Answer } from "@/domain/forum/enterprise/entities/answer.js";
import { type AnswerProps } from "@/domain/forum/enterprise/entities/answer.js";
import { faker } from "@faker-js/faker";

export function makeAnswer(
  overrides: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...overrides,
    },
    id
  );

  return answer;
}
