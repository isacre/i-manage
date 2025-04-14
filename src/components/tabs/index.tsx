import React from "react";

interface Props {
  tabs: {
    text: string;
    onClick: () => void;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export default function TabsComponent({ tabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="mb-6 flex">
      {tabs.map((tab) => (
        <button
          key={tab.text}
          className={`cursor-pointer flex-1 border-b-2 ${activeTab === tab.text ? "border-red-500" : "border-gray-200"} py-2 text-center font-medium ${
            activeTab === tab.text ? "text-red-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab.text)}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
}
