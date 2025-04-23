"use client";
import { registerCompany } from "@/services/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterCompany() {
  const tCompany = useTranslations("register_company");
  const tCategories = useTranslations("Categories");
  const { register: registerCompanyForm, handleSubmit: handleCompanySubmit } = useForm();
  const router = useRouter();
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

  return (
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
  );
}
