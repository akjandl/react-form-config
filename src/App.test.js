import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders application header", () => {
  render(<App />);
  const applicationHeader = screen.getByText(/application/i);
  expect(applicationHeader).toBeInTheDocument();
});
