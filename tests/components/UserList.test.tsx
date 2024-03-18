import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";

describe("UserList", () => {
  it("should render no users if users array is empty", () => {
    render(<UserList users={[]} />);
    const noUsers = screen.getByText(/no users/i);
    expect(noUsers).toBeInTheDocument();
  });

  it("should render a list of users if users array is provided", () => {
    const users = [
      { id: 1, name: "Tomas" },
      { id: 2, name: "John" },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
