import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

import { GetQuestionBySlugUseCase } from "./get-question-by-slug"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("GetQuestionBySlugUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it("should be able to create a question", async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question",
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
