import { type Either, left, right } from "@/core/either"

import { Question } from "../../enterprise/entities/question"
import type { QuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFound } from "./errors/resource-not-found"

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFound,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFound())
    }

    return right({ question })
  }
}
