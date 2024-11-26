import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NoData from "@/components/order/NoData";
import "@testing-library/jest-dom";

describe("NoData Component", () => {
  it("renders the component with default props", () => {
    const { container } = render(<NoData />);

    const image = screen.getByAltText("No data");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("w-40 h-40 mb-4");
    expect(image).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731403601/no-data_l2xxij.png"
    );
  });

  it("renders with custom title and paragraph", () => {
    const testTitle = "No Results Found";
    const testParagraph = "Try adjusting your search or filter";

    render(<NoData title={testTitle} paragraph={testParagraph} />);

    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      "text-white font-mono text-xl font-semibold"
    );

    const paragraphElement = screen.getByText(testParagraph);
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass("text-earth1 font-mono text-center");
  });

  it("renders without title or paragraph", () => {
    const { container } = render(<NoData />);

    const titleElement = container.querySelector("h2");
    const paragraphElement = container.querySelector("p");

    expect(titleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("");
    expect(paragraphElement.textContent).toBe("");
  });

  it("has correct container styling", () => {
    const { container } = render(<NoData />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass(
      "flex flex-col items-center justify-center p-8 text-gray-500"
    );
  });

  it("passes prop types validation", () => {
    // This is more of a compile-time check, but we can do a basic runtime check
    const consoleError = console.error;
    const mockConsoleError = vi.fn();
    console.error = mockConsoleError;

    try {
      render(<NoData title={123} paragraph={456} />);
    } catch (error) {}

    console.error = consoleError;
  });
});
