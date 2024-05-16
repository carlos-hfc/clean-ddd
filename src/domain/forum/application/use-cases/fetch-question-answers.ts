import type { Answer } from "../../enterprise/entities/answer"
import type { AnswersRepository } from "../repositories/answers-repository"

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answerssRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerssRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}