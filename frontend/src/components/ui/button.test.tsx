import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Button } from "./button"

describe("Button", () => {
  it("should render with default props", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary", "text-primary-foreground")
  })

  it("should render with different variants", () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>)
    let button = screen.getByRole("button", { name: "Destructive" })
    expect(button).toHaveClass("bg-destructive", "text-white")

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole("button", { name: "Outline" })
    expect(button).toHaveClass("border", "border-input", "bg-background")

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole("button", { name: "Secondary" })
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground")

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole("button", { name: "Ghost" })
    expect(button).toHaveClass("hover:bg-accent", "hover:text-accent-foreground")

    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole("button", { name: "Link" })
    expect(button).toHaveClass("text-primary", "underline-offset-4", "hover:underline")
  })

  it("should render with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole("button", { name: "Small" })
    expect(button).toHaveClass("h-8", "rounded-md", "px-3", "text-xs")

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole("button", { name: "Large" })
    expect(button).toHaveClass("h-10", "rounded-md", "px-8")

    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole("button", { name: "Icon" })
    expect(button).toHaveClass("size-9")
  })

  it("should handle click events", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole("button", { name: "Click me" })
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole("button", { name: "Disabled" })
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50")
  })

  it("should apply custom className", () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole("button", { name: "Custom" })
    expect(button).toHaveClass("custom-class")
  })

  it("should render as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    )

    const link = screen.getByRole("link", { name: "Link Button" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
    expect(link).toHaveClass("bg-primary", "text-primary-foreground")
  })
})
