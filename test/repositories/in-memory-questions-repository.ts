import type { PaginationParams } from "@/core/repositories/pagination-params"
import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import type { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find(item => item.slug.value === slug) ?? null
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items[itemIndex] = question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
