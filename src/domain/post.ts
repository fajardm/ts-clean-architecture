import * as uuid from "uuid";
import { Entity } from "./entity";

export class Post extends Entity {
  title!: string;
  content!: string;
  _tags?: string[];

  set tags(tags: string[] | undefined) {
    if (!tags) return;
    this._tags = tags;
  }

  get tags(): string[] | undefined {
    return this._tags;
  }

  static new(title: string, content: string, creatorId: string): Post {
    let entity = new Post();
    entity.id = uuid.v4();
    entity.createdBy = creatorId;
    entity.createdAt = new Date();
    entity.title = title;
    entity.content = content;
    return entity;
  }

  static load(
    id: string,
    title: string,
    content: string,
    tags: string[] | undefined,
    createdBy: string,
    createdAt: Date,
    updatedBy?: string,
    updatedAt?: Date
  ): Post {
    let entity = new Post();
    entity.id = id;
    entity.title = title;
    entity.content = content;
    entity._tags = tags;
    entity.createdBy = createdBy;
    entity.createdAt = createdAt;
    entity.updatedBy = updatedBy;
    entity.updatedAt = updatedAt;
    return entity;
  }
}

export interface Repository {
  create(entity: Post): Promise<Post>;
}
