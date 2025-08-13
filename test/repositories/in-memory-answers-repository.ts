import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = [];

    async findById(id: string) {
        const answer = this.items.find(item => item.id.toString() === id);
        return answer ? answer : null;
    }

    async create(answer: Answer) {
        this.items.push(answer);
    }

    async delete(answer: Answer) {
        this.items = this.items.filter(item => item.id.toString() !== answer.id.toString());
    }
}