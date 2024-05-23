import { render, screen } from "@testing-library/react";
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
});
