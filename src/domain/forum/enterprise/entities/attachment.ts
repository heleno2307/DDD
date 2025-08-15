import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

interface AttachementProps {
  title: string
  link: string
}

export class Attachement extends Entity<AttachementProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachementProps, id?: UniqueEntityID) {
    const attachment = new Attachement(props, id)
    return attachment
  }
}
