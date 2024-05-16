import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository"
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answerComment.id)

    this.items.splice(itemIndex, 1)
  }
}
