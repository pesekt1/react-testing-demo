import { render, screen } from "@testing-library/react";

import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole("heading"), //error if not found
      checkbox: screen.getByRole("checkbox"), //error if not found
      button: screen.getByRole("button"), //error if not found
    };
  };

  it("should render correctly with the initial state", () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it("should enable the button when the checkbox is checked", async () => {
    // Arrange
    const { checkbox, button } = renderComponent();

    // Act
    await userEvent.click(checkbox);

    // Assert
    expect(button).toBeEnabled();
  });
});
