import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository"
import type { Notification } from "@/domain/notification/enterprise/entities/notification"

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  // async countManyByRecipientId(recipientId: string): Promise<number> {
  //   return this.notifications.filter(item => item.recipientId === recipientId).length;
  // }

  // async findById(notificationId: string): Promise<Notification | null> {
  //   const notification = this.notifications.find(item => item.id === notificationId);

  //   if (!notification) {
  //     return null;
  //   }

  //   return notification;
  // }

  // async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
  //   return this.notifications.filter(item => item.recipientId === recipientId);
  // }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  // async save(notification: Notification): Promise<void> {
  //   const notificationIndex = this.notifications.findIndex(item => item.id === notification.id);

  //   if (notificationIndex >= 0) {
  //     this.notifications[notificationIndex] = notification;
  //   }
  // }
}
