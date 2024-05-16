import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  return Question.create({
    title: "Example question",
    slug: Slug.create("example-question"),
    authorId: new UniqueEntityID(),
    content: "Example content",
    ...override,
  })
}
