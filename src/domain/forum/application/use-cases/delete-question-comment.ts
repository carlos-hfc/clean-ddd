import type { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questioncommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error("Question comment not found.")
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Method not allowed.")
    }

    await this.questioncommentsRepository.delete(questionComment)

    return {}
  }
}
