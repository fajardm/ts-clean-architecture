import * as uuid from "uuid";
import * as orm from "./post";
import * as post from "./../../../domain/post";

let mockCreate = (orm.Post.create = jest.fn());

describe("fromPostEntity", () => {
  test("with undefined tags", () => {
    let mockPost = new post.Post();

    let postModel = orm.Post.fromPostEntity(mockPost);

    expect(postModel.id).toEqual(mockPost.id);
  });

  test("with tags", () => {
    let mockPost = new post.Post();
    mockPost.tags = ["xxx"];

    let postModel = orm.Post.fromPostEntity(mockPost);

    expect(postModel.id).toEqual(mockPost.id);
  });
});

describe("create", () => {
  test("should success", async () => {
    let mockPost = post.Post.new("xxxx", "zzzz", uuid.v4());
    let mockPostModel = orm.Post.fromPostEntity(mockPost);

    mockCreate.mockResolvedValue(mockPostModel);

    let created = await mockPostModel.create();

    expect(mockCreate).toBeCalled();
    expect(created).toEqual(mockPost);
  });

  test("should throw error", async () => {
    let mockPost = post.Post.new("xxxx", "zzzz", uuid.v4());
    let mockPostModel = orm.Post.fromPostEntity(mockPost);
    let mockError = Error("unexpected");

    mockCreate.mockRejectedValue(mockError);

    try {
      await mockPostModel.create();
    } catch (err) {
      expect(err).toEqual(mockError);
    }

    expect(mockCreate).toBeCalled();
  });
});

describe("toPostEntity", () => {
  test("with tags", () => {
    let mockPostModel = new orm.Post();
    mockPostModel.tags = "xxx";

    let postEntity = mockPostModel.toPostEntity();

    expect(postEntity.tags).toEqual(["xxx"]);
  });
});
