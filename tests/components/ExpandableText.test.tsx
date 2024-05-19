import { render, screen } from "@testing-library/react";

import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 255 characters", () => {
    const text = "This is a short text";
    render(<ExpandableText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collpse text when Less button is clicked", async () => {
    // Arrange
    render(<ExpandableText text={longText} />);
    const moreButton = screen.getByRole("button", { name: /more/i });
    await userEvent.click(moreButton);

    // Act
    const lessButton = screen.getByRole("button", { name: /less/i });
    await userEvent.click(lessButton);

    // Assert
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(moreButton).toHaveTextContent(/more/i);
  });
});
