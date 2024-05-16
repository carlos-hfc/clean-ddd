import type { AnswersRepository } from "../repositories/answers-repository"
import { AnswerQuestionUseCase } from "./answer-question"

const fakeAnswersRepository: AnswersRepository = {
  async create(answer) {},
}

describe("AnswerQuestionUseCase", () => {
  it("create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const { answer } = await answerQuestion.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova resposta",
    })

    expect(answer.content).toEqual("Nova resposta")
  })
})
