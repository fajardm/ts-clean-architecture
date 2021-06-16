import * as domain from "./../../domain/post";
import * as orm from "./orm/post";

export class PostRepository implements domain.Repository {
  async create(entity: domain.Post): Promise<domain.Post> {
    return await orm.Post.fromPostEntity(entity).create();
  }
}
