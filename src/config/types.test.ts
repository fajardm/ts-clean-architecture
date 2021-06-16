import { getEnv } from "./types";

test("getEnv", () => {
  let res = getEnv<string>("XXX", "AAA");

  expect(res).toEqual("AAA");
});
