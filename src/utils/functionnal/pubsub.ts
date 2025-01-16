import createUniqId from "@/src/utils/id/createUniqId"

type EventHandler<T = any> = (data: T) => void

export interface PubSub<T = any> {
  subscribe(handler: EventHandler<T>): string

  unsubscribe(event: string): void

  publish(data: T): void
}

export function createPubSub<T = any>(): PubSub<T> {
  const handlers: { [key: string]: EventHandler } = {}

  return {
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

export function createChannelPubSub<T = any>() {
  const channels: { [channel: string]: PubSub<T> } = {}

  return {
    subscribe(channel: string | "all", handler: EventHandler<T>): string {
      if (!channels[channel]) {
        channels[channel] = createPubSub<T>()
      }
      return channels[channel].subscribe(handler)
    },

    unsubscribe(channel: string, id: string): void {
      if (!channels[channel]) return
      channels[channel].unsubscribe(id)
    },

    publish(channel: string, data: T): void {
      if (channels["all"]) channels["all"].publish(data)
      if (channels[channel]) channels[channel].publish(data)
    },
  }
}
