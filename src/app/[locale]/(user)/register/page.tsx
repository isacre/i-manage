"use client";
import { registerCompany, registerUser } from "@/services/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import TabsComponent from "@/components/tabs";

export default function Register() {
  const tCompany = useTranslations("register_company");
  const tUser = useTranslations("register_user");
  const tCategories = useTranslations("Categories");
  const tLogin = useTranslations("login");
  const { register: registerCompanyForm, handleSubmit: handleCompanySubmit } = useForm();
  const { register: registerUserForm, handleSubmit: handleUserSubmit } = useForm();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tLogin("company"));

  const categories = ["electric", "mechanic", "health", "home", "services"];

  function onCompanySubmit(data: any) {
    registerCompany(data)
      .then((res) => {
        console.log(res);
        toast.success(tCompany("success"));
        router.push("/login");
      })
      .catch((err) => {
        toast.error(tCompany("error"));
      });
  }

  function onUserSubmit(data: any) {
    registerUser(data)
      .then((res) => {
        console.log(res);
        toast.success(tUser("success"));
        router.push("/login");
      })
      .catch((err) => {
        toast.error(tUser("error"));
      });
  }

  const tabs = [
    { text: tLogin("company"), onClick: () => setActiveTab(tLogin("company")) },
    { text: tLogin("user"), onClick: () => setActiveTab(tLogin("user")) },
  ];

  return (
    <div className="min-h-screen py-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
        <TabsComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === tLogin("company") ? (
          <form onSubmit={handleCompanySubmit(onCompanySubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("name")}</label>
                  <input
                    {...registerCompanyForm("name", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={64}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("description")}</label>
                  <textarea
                    {...registerCompanyForm("description", { required: true })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition h-32"
                    maxLength={264}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("phone")}</label>
                  <input
                    {...registerCompanyForm("phone", { required: true })}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={15}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("category")}</label>
                  <select
                    {...registerCompanyForm("category", { required: true })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {tCategories(category)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("email")}</label>
                  <input
                    {...registerCompanyForm("email", { required: true })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tCompany("password")}</label>
                  <input
                    {...registerCompanyForm("password", { required: true })}
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={128}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-red-600 text-white rounded-lg py-3 px-4 hover:bg-red-500 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {tCompany("register")}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleUserSubmit(onUserSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tUser("name")}</label>
                  <input
                    {...registerUserForm("name", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={64}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tUser("phone")}</label>
                  <input
                    {...registerUserForm("phone", { required: true })}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={15}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tUser("email")}</label>
                  <input
                    {...registerUserForm("email", { required: true })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{tUser("password")}</label>
                  <input
                    {...registerUserForm("password", { required: true })}
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength={128}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-red-600 text-white rounded-lg py-3 px-4 hover:bg-red-500 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {tUser("register")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
