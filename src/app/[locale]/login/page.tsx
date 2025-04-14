"use client";
import { useTranslations } from "next-intl";
import TabsComponent from "@/components/tabs";
import { useState } from "react";
export default function Login() {
  const t = useTranslations("login");
  const [activeTab, setActiveTab] = useState(t("user"));
  const tabs = [
    { text: t("user"), onClick: () => setActiveTab(t("user")) },
    { text: t("company"), onClick: () => setActiveTab(t("company")) },
  ];
  return (
    <div>
      <div className="flex  justify-center ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <TabsComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
