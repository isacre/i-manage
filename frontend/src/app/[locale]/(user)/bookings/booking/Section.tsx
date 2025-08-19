import React from "react"

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 px-6 py-4">
      <div className="flex items-center space-x-3">{children}</div>
    </div>
  )
}
