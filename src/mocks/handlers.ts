import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Books" },
      { id: 3, name: "Clothing" },
    ]);
  }),

  http.get("/products", () => {
    return HttpResponse.json([
      { id: 1, name: "Macbook Pro" },
      { id: 2, name: "iPad Pro" },
      { id: 3, name: "iPhone 13" },
    ]);
  }),
];
