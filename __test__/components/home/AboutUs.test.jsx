import { render, screen } from "@testing-library/react";
import AboutUs from "@/components/home/AboutUs";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("AboutUs Component", () => {
  it("renders the About Us section with the correct heading", () => {
    render(<AboutUs />);
    const heading = screen.getByRole("heading", { name: /about us/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the article text correctly", () => {
    render(<AboutUs />);
    const articleText = screen.getByText(
      /We are dedicated to providing innovative, professional, and reliable solutions tailored to your needs. With a focus on excellence and client satisfaction, we ensure every project meets your expectations./i
    );
    expect(articleText).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<AboutUs />);
    const featureCards = screen.getAllByRole("heading", { level: 2 });
    expect(featureCards).toHaveLength(3);

    const professionalCard = screen.getByText(/professional/i);
    const innovativeCard = screen.getByText(/innovative/i);
    const reliableCard = screen.getByText(/reliable/i);

    expect(professionalCard).toBeInTheDocument();
    expect(innovativeCard).toBeInTheDocument();
    expect(reliableCard).toBeInTheDocument();
  });

  it("renders the image with the correct alt text", () => {
    render(<AboutUs />);
    const image = screen.getByAltText(
      /close-up of a professional handshake representing our trust and reliability/i
    );
    expect(image).toBeInTheDocument();
  });

  it("applies hover effect styles to feature cards", () => {
    render(<AboutUs />);
    const featureCard = screen.getByText(/professional/i).closest("div");
    expect(featureCard).toHaveClass("group");
    expect(featureCard).toHaveClass("hover:shadow-2xl");
  });

  it("applies the correct background color to the section", () => {
    render(<AboutUs />);
    const section = screen
      .getByRole("region", { name: /about us/i })
      .closest("section");
    expect(section).toHaveClass("bg-earth1");
  });
});
