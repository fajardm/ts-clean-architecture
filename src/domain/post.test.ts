import { Post } from "./post";

describe("tags setter", () => {
  test("undefined", () => {
    let mockEntity = new Post();
    mockEntity.tags = undefined;

    expect(mockEntity.tags).toEqual(undefined);
  });
});
