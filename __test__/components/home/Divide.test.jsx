import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Divide from "@/components/home/Divide";

describe("Divide Component", () => {
  it("renders correctly", () => {
    render(<Divide />);

    const section = screen.getByRole("region", { name: "Coffee Showcase" });
    expect(section).toBeDefined();
    expect(section).toHaveClass("bg-earth1");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeDefined();
    expect(heading).toHaveTextContent("Check out our best coffee beans here");

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    // Check the first image (Flying Coffee)
    expect(images[0]).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730861879/flyingCoffee_gwkbg6.png"
    );
    expect(images[0]).toHaveAttribute("alt", "Flying Coffee");

    // Check the second image (Coffee Beans)
    expect(images[1]).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730861588/coffee-bean_exnpsc.png"
    );
    expect(images[1]).toHaveAttribute("alt", "Coffee Beans");
  });
});
