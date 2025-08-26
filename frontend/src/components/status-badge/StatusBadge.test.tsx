import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import StatusBadge from "./index"

describe("StatusBadge", () => {
  it('should render with "Ativo" status', () => {
    render(<StatusBadge status="Ativo" />)

    const badge = screen.getByText("Ativo")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass("bg-green-100", "text-green-800")
  })

  it('should render with "Inativo" status', () => {
    render(<StatusBadge status="Inativo" />)

    const badge = screen.getByText("Inativo")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass("bg-gray-100", "text-gray-800")
  })

  it("should have the correct base classes for both statuses", () => {
    const { rerender } = render(<StatusBadge status="Ativo" />)

    let badge = screen.getByText("Ativo")
    expect(badge).toHaveClass("px-2", "inline-flex", "text-xs", "leading-5", "font-semibold", "rounded-full")

    rerender(<StatusBadge status="Inativo" />)
    badge = screen.getByText("Inativo")
    expect(badge).toHaveClass("px-2", "inline-flex", "text-xs", "leading-5", "font-semibold", "rounded-full")
  })

  it("should display the correct status text", () => {
    const { rerender } = render(<StatusBadge status="Ativo" />)
    expect(screen.getByText("Ativo")).toBeInTheDocument()

    rerender(<StatusBadge status="Inativo" />)
    expect(screen.getByText("Inativo")).toBeInTheDocument()
  })
})
