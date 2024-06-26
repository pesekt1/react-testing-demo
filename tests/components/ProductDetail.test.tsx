import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { db } from "../../src/mocks/db";
import { server } from "../../src/mocks/server";
import { HttpResponse, http } from "msw";

describe("ProductList", () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: productId } } });
  });

  it("should render a product detail", async () => {
    render(<ProductDetail productId={productId} />);
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });

    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
  });

  it("should render message if product is not found", async () => {
    server.use(http.get("/products/:1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error if data fetching fails", async () => {
    server.use(http.get("/products/:1", () => HttpResponse.error()));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });

  it("should render a loading indicator when loading", async () => {
    server.use(http.get("/products/:1", () => new Promise(() => {})));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/loading/i);
    expect(message).toBeInTheDocument();
  });

  it("should remove the loading indicator when data is loaded", async () => {
    render(<ProductDetail productId={1} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should remove the loading indicator if data fetching fails", async () => {
    server.use(http.get("/products/:1", () => HttpResponse.error()));

    render(<ProductDetail productId={1} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
