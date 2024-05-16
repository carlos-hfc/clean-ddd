import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

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
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: "example-question",
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      question: inMemoryQuestionsRepository.items[0],
    })
  })
})
