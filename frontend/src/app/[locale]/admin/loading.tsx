"use client"
import React from "react"

export default function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  )
}
