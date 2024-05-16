import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answercommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error("Answer comment not found.")
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error("Method not allowed.")
    }

    await this.answercommentsRepository.delete(answerComment)

    return {}
  }
}
