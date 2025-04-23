"use client";
import TabsComponent from "@/components/tabs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterCompany from "./company";
import RegisterUser from "./user";

export default function Register() {
  const tLogin = useTranslations("login");
  const [activeTab, setActiveTab] = useState(tLogin("company"));

  const tabs = [
    { text: tLogin("company"), onClick: () => setActiveTab(tLogin("company")) },
    { text: tLogin("user"), onClick: () => setActiveTab(tLogin("user")) },
  ];

  return (
    <div className="min-h-screen py-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
        <TabsComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === tLogin("company") ? <RegisterCompany /> : <RegisterUser />}
      </div>
    </div>
  );
}
