import React from "react"

interface Props {
  tabs: {
    text: string
    onClick: () => void
    value: string
  }[]
  activeTab: string
  setActiveTab: (tab: string) => void
  className?: string
}
export default function TabsComponent({ tabs, activeTab, setActiveTab, className }: Props) {
  return (
    <div className={`flex ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.text}
          className={`flex-1 cursor-pointer border-b-2 ${activeTab === tab.value ? "border-red-500" : "border-gray-200"} py-2 text-center font-medium ${
            activeTab === tab.value ? "text-red-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.text}
        </button>
      ))}
    </div>
  )
}
