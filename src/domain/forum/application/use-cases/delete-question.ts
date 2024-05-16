import { type Either, left, right } from "@/core/either"

import type { QuestionsRepository } from "../repositories/questions-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  object
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFound())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowed())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
