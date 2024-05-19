import { render, screen } from "@testing-library/react";

import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);

    return {
      onChange,
      input: screen.getByPlaceholderText(/search/i),
    };
  };

  it("should render an input field for searching", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when Enter is pressed, if input is filled", async () => {
    const { input, onChange } = renderSearchBox();
    const searchTerm = "Search term";

    await userEvent.type(input, searchTerm + "{enter}");

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("should not call onChange when Enter is pressed, if input is empty", async () => {
    const { input, onChange } = renderSearchBox();

    await userEvent.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
