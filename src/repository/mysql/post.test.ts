import * as uuid from "uuid";
import { PostRepository } from "./post";
import { Post } from "./../../domain/post";
import { Post as PostORM } from "./orm/post";

jest.mock("./orm/post");

let MockPostORM = PostORM as jest.MockedClass<typeof PostORM>;
let mockFromPostEntity = (MockPostORM.fromPostEntity = jest.fn());

beforeEach(() => {
  MockPostORM.mockClear();
});

test("create", async () => {
  expect(MockPostORM).not.toHaveBeenCalled();

  let mockPost = Post.new("xxxx", "zzzz", uuid.v4());

  mockFromPostEntity.mockReturnValue(new PostORM());
  MockPostORM.prototype.create.mockResolvedValue(mockPost);

  let created = await new PostRepository().create(mockPost);

  expect(mockFromPostEntity).toBeCalled();
  expect(MockPostORM.prototype.create).toBeCalled();
  expect(created).toEqual(mockPost);
});
