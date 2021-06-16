import { Sequelize, Model, DataTypes } from "sequelize";
import * as domain from "../../../domain/post";
import sequelize from "./sequielize";

interface PostAttributes {
  id: string;
  title: string;
  content: string;
  tags?: string;
  createdBy: string;
  createdAt: Date;
  updateBy?: string;
  updateAt?: Date;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  id!: string;
  title!: string;
  content!: string;
  tags?: string;
  createdBy!: string;
  createdAt!: Date;
  updatedBy?: string;
  updatedAt?: Date;

  static fromPostEntity(entity: domain.Post): Post {
    let post = new Post();
    post.id = entity.id;
    post.title = entity.title;
    post.content = entity.content;
    post.tags = entity.tags?.join(",");
    post.createdBy = entity.createdBy;
    post.createdAt = entity.createdAt;
    post.updatedBy = entity.updatedBy;
    post.updatedAt = entity.updatedAt;
    return post;
  }

  async create(): Promise<domain.Post> {
    try {
      let saved = await Post.create(this);
      return saved.toPostEntity();
    } catch (err) {
      throw err;
    }
  }

  toPostEntity(): domain.Post {
    return domain.Post.load(
      this.id,
      this.title,
      this.content,
      this.tags?.split(","),
      this.createdBy,
      this.createdAt,
      this.updatedBy,
      this.updatedAt
    );
  }
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updateBy: {
      type: DataTypes.STRING,
    },
    updateAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "posts",
    sequelize,
  }
);

export { Post };
