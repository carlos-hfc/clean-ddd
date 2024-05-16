import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("GetQuestionBySlugUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it("should be able to create a question", async () => {
    const newQuestion = Question.create({
      title: "Example question",
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID("1"),
      content: "Nova resposta",
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question",
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
