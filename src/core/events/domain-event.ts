import type { UniqueEntityID } from '../entities/unique-entity-id.js'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
