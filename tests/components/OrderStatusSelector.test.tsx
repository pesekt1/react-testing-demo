import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
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
    const getStatuses = () => screen.findAllByRole("option");

    return { button, getStatuses };
  };

  it("should render New as the default value", async () => {
    const { button } = renderOrderStatusSelector();

    expect(button).toHaveTextContent("New");
  });

  it("should render correct statuses", async () => {
    const { button, getStatuses } = renderOrderStatusSelector();

    userEvent.click(button);

    const statuses = await getStatuses();
    expect(statuses).toHaveLength(3);

    const labels = statuses.map((status) => status.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });
});
