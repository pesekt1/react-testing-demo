import { render, screen } from "@testing-library/react";

import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const result = render(<ProductImageGallery imageUrls={[]} />);
    expect(result.container).toBeEmptyDOMElement(); //container for the component
  });

  it("should render a list of images", () => {
    const imageUrls = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
