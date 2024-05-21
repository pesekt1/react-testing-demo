import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";
import { get } from "http";

describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    const button = screen.getByRole("combobox");
    const getStatuses = () => screen.findAllByRole("option");
    const getOption = (label: RegExp) =>
      screen.findByRole("option", { name: label });

    return { button, getStatuses, getOption, onChange };
  };

  it("should render New as the default value", async () => {
    const { button } = renderOrderStatusSelector();

    expect(button).toHaveTextContent("New");
  });

  it("should render correct statuses", async () => {
    const { button, getStatuses } = renderOrderStatusSelector();

    await userEvent.click(button);

    const statuses = await getStatuses();
    expect(statuses).toHaveLength(3);

    const labels = statuses.map((status) => status.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    [/processed/i, "processed"],
    [/fulfilled/i, "fulfilled"],
  ])(
    "should call onChange with $value if $label option is selected",
    async (label, value) => {
      const { button, onChange, getOption } = renderOrderStatusSelector();
      await userEvent.click(button);

      const option = await getOption(label);
      await userEvent.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  //this case is separate, because we first need to click on the button,
  //select another option
  //then click the button again and select the New option
  it("should call onChange with 'new' if New option is selected", async () => {
    const { button, onChange, getOption } = renderOrderStatusSelector();
    await userEvent.click(button);

    const processedOption = await getOption(/processed/i);
    await userEvent.click(processedOption);

    await userEvent.click(button);
    const newOption = await getOption(/new/i);
    await userEvent.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
