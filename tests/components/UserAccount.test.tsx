import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  const userNotAdmin: User = { id: 1, name: "Tomas" };

  it("should render user name", () => {
    render(<UserAccount user={userNotAdmin} />);

    const name = screen.getByText(/tomas/i);
    expect(name).toBeInTheDocument();
  });

  it("should render an edit button if user is admin", () => {
    const user: User = { id: 1, name: "Tomas", isAdmin: true };

    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render an edit button if user is not admin", () => {
    render(<UserAccount user={userNotAdmin} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
