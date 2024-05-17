import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"

import { SendNotification } from "./send-notification"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotification

describe("SendNotification", () => {
  it("should be able to send a notification", async () => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotification = new SendNotification(inMemoryNotificationsRepository)

    const result = await sendNotification.execute({
      recipientId: "1",
      title: "Nova notificação",
      content: "Conteúdo da notificação",
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
