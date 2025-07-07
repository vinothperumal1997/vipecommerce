import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // ✅ import this
import App from "./App";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      {" "}
      {/* ✅ Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
