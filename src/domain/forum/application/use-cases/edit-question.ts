import { type Either, left, right } from "@/core/either"

import type { Question } from "../../enterprise/entities/question"
import type { QuestionsRepository } from "../repositories/questions-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFound())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowed())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
