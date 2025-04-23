import React from "react"

export default function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full flex-col gap-6 p-6">{children}</div>
}
