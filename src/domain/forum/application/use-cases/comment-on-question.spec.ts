import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

import { CommentOnQuestionUseCase } from "./comment-on-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe("CommentOnQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it("should be able to comment on question", async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      questionComment: inMemoryQuestionCommentsRepository.items[0],
    })
  })
})
