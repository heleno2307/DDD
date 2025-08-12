import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Entity } from "@/core/entities/entity.js";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id);

    return student;
  }
}
