import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "../../src/mocks/server";
import { http, HttpResponse } from "msw";

import ProductList from "../../src/components/ProductList";
import { db } from "../../src/mocks/db";

describe("ProductList", () => {
  const productsIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productsIds.push(product.id);
    });
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productsIds } } });
  });

  it("should render a list of products", async () => {
    render(<ProductList />);
    const products = await screen.findAllByRole("listitem");
    expect(products.length).toBeGreaterThan(0);
  });

  it("should render no products available if no product is found", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));

    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  //render error message when Error
  it("should render an error message when an error occurs", async () => {
    server.use(http.get("/products", () => HttpResponse.error()));

    render(<ProductList />);

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });

  it("should render a loading indicator when loading", async () => {
    server.use(http.get("/products", () => new Promise(() => {})));

    render(<ProductList />);

    const message = await screen.findByText(/loading/i);
    expect(message).toBeInTheDocument();
  });

  it("should remove the loading indicator when data is loaded", async () => {
    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should remove the loading indicator if data fetching fails", async () => {
    server.use(http.get("/products", () => HttpResponse.error()));

    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
