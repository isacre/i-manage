import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoadingSpinner from "./index"

describe("LoadingSpinner", () => {
  it("should render the loading spinner", () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toBeInTheDocument()
  })

  it("should have the correct CSS classes", () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toHaveClass("flex", "h-full", "w-full", "items-center", "justify-center")
  })

  it("should contain the spinning animation element", () => {
    render(<LoadingSpinner />)

    const spinningElement = document.querySelector("span")
    expect(spinningElement).toHaveClass(
      "inline-block",
      "h-12",
      "w-12",
      "animate-spin",
      "rounded-full",
      "border-4",
      "border-red-600",
      "border-b-transparent",
    )
  })
})
