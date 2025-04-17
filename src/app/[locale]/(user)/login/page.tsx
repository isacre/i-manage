"use client";
import TabsComponent from "@/components/tabs";
import { getTokens, getUserData } from "@/services/auth";
import { useUserStore } from "@/stores/user-store";
import { setCookie } from "@/utils";
import { serialize } from "cookie";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const t = useTranslations("login");
  const [activeTab, setActiveTab] = useState(t("company"));
  const locale = useLocale();
  const router = useRouter();
  const tabs = [{ text: t("company"), onClick: () => setActiveTab(t("company")) }];
  const { update } = useUserStore();
  const { register, handleSubmit } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function fetchAndStoreUserData() {
    getUserData().then((res) => {
      update(res);
      if (res.company !== null) {
        router.push(`/${locale}/admin/employees`);
      } else {
        router.push(`/${locale}/`);
      }
    });
  }
  function login(data: { email: string; password: string }) {
    getTokens(data)
      .then((res) => {
        setCookie("access", res.access);
        setCookie("refresh", res.refresh);
        fetchAndStoreUserData();
      })
      .catch((err) => {
        toast.error(t("error"));
      });
  }

  return (
    <div>
      <div className="flex  justify-center ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <TabsComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <form className="space-y-6" onSubmit={handleSubmit(login)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <input
                {...register("email")}
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
                {...register("password")}
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
