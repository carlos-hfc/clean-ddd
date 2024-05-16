import { type Either, left, right } from "@/core/either"

import type { Answer } from "../../enterprise/entities/answer"
import type { AnswersRepository } from "../repositories/answers-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFound())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowed())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
