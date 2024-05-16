import type { QuestionsRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"

const fakeQuestionRepository: QuestionsRepository = {
  async create(question) {},
}

describe("CreateQuestionUseCase", () => {
  it("create an answer", async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestion.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
    })

    expect(question.id).toBeTruthy()
  })
})
