"use client";
import { registerUser } from "@/services/auth";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterUser() {
  const tUser = useTranslations("register_user");
  const { register: registerUserForm, handleSubmit: handleUserSubmit } = useForm();
  const router = useRouter();
  const locale = useLocale();

  function onUserSubmit(data: any) {
    registerUser(data)
      .then((res) => {
        toast.success(tUser("success"));
        router.push(`/${locale}/login`);
      })
      .catch((err) => {
        toast.error(tUser("error"));
      });
  }

  return (
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
  );
}
