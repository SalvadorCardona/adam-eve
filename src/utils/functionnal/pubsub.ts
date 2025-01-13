import createUniqId from "@/src/utils/id/createUniqId"

type EventHandler<T = any> = (data: T) => void

export interface PubSub<T = any> {
  subscribe(handler: EventHandler<T>): void

  unsubscribe(event: string): void

  publish(data: T): void
}

export function createPubSub<T = any>(): PubSub<T> {
  const handlers: { [key: string]: EventHandler } = {}

  return {
    // S'abonner à un événement
    subscribe(handler: EventHandler<T>): string {
      const id = createUniqId()
      handlers[id] = handler

      return id
    },

    unsubscribe(id: string): void {
      if (!handlers[id]) return

      delete handlers[id]
    },

    // Publier un événement
    publish(data: T): void {
      Object.values(handlers).forEach((handler) => handler(data))
    },
  }
}
