import { type Either, left, right } from "@/core/either"

import type { AnswersRepository } from "../repositories/answers-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFound | NotAllowed, object>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFound())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowed())
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
