import { it, describe } from "vitest";
import { db } from "../src/mocks/db";

describe("group", () => {
  it("should", () => {
    const product = db.product.create();
    console.log(product);
  });
});
