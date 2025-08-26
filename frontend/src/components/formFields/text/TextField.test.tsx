import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useForm } from "react-hook-form"
import TextField from "./index"

// Wrapper component para testar com react-hook-form
function TestWrapper({ children }: { children: React.ReactNode }) {
  const { register } = useForm()
  return <>{children}</>
}

// Mock do react-hook-form
vi.mock("react-hook-form", () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(() => ({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: "test",
      ref: vi.fn(),
    })),
  })),
}))

describe("TextField", () => {
  it("should render with label", () => {
    render(
      <TestWrapper>
        <TextField id="test" label="Test Label" register={vi.fn()} />
      </TestWrapper>,
    )

    expect(screen.getByText("Test Label")).toBeInTheDocument()
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument()
  })

  it("should render without label", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} />
      </TestWrapper>,
    )

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("should render with placeholder", () => {
    render(
      <TestWrapper>
        <TextField id="test" placeholder="Enter text here" register={vi.fn()} />
      </TestWrapper>,
    )

    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument()
  })

  it("should render with default placeholder when not provided", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} />
      </TestWrapper>,
    )

    expect(screen.getByPlaceholderText("")).toBeInTheDocument()
  })

  it("should render error message when error is provided", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} error="This field is required" />
      </TestWrapper>,
    )

    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByText("This field is required")).toHaveClass("text-red-500")
  })

  it("should not render error message when error is not provided", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} />
      </TestWrapper>,
    )

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument()
  })

  it("should have correct CSS classes", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} />
      </TestWrapper>,
    )

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass(
      "w-full",
      "rounded-lg",
      "border",
      "border-gray-300",
      "bg-white",
      "px-4",
      "py-2",
      "transition",
      "focus:ring-2",
      "focus:ring-red-500",
      "focus:outline-none",
    )
  })

  it("should pass through additional props", () => {
    render(
      <TestWrapper>
        <TextField id="test" register={vi.fn()} data-testid="custom-input" aria-label="Custom input" />
      </TestWrapper>,
    )

    const input = screen.getByTestId("custom-input")
    expect(input).toHaveAttribute("aria-label", "Custom input")
  })

  it("should have correct label association", () => {
    render(
      <TestWrapper>
        <TextField id="test-field" label="Test Label" register={vi.fn()} />
      </TestWrapper>,
    )

    const label = screen.getByText("Test Label")
    const input = screen.getByRole("textbox")

    expect(label).toHaveAttribute("for", "test-field")
    expect(input).toHaveAttribute("id", "test-field")
  })
})
