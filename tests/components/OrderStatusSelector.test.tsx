import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  it("should render New as the default value", () => {
    render(
      <Theme>
        <OrderStatusSelector
          onChange={() => {
            vi.fn();
          }}
        />
      </Theme>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveTextContent("New");
  });

  it("should render correct statuses", async () => {
    render(
      <Theme>
        <OrderStatusSelector
          onChange={() => {
            vi.fn();
          }}
        />
      </Theme>
    );

    const button = screen.getByRole("combobox");
    userEvent.click(button);

    const statuses = await screen.findAllByRole("option");
    expect(statuses).toHaveLength(3);
    const labels = statuses.map((status) => status.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });
});
