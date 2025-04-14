"use client";
import { registerCompany } from "@/services/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterCompany() {
  const t = useTranslations("register_company");
  const tCategories = useTranslations("Categories");
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  function onSubmit(data: any) {
    registerCompany(data)
      .then((res) => {
        console.log(res);
        toast.success(t("success"));
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  const categories = ["electric", "mechanic", "health", "home", "services"];

  return (
    <div className="min-h-screen py-2">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 border-b pb-2">{t("title")}</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  maxLength={64}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("description")}</label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition h-32"
                  maxLength={264}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  maxLength={15}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("category")}</label>
                <select
                  {...register("category", { required: true })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("password")}</label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  maxLength={128}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-red-600 text-white rounded-lg py-3 px-4 hover:bg-red-500 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t("register")}
          </button>
        </div>
      </form>
    </div>
  );
}

{
  /* <div className="space-y-6">
<h2 className="text-3xl font-bold text-gray-900 border-b pb-2">Additional Information</h2>
<div className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-3">Work Days</label>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {[
        { value: 0, label: "Monday" },
        { value: 1, label: "Tuesday" },
        { value: 2, label: "Wednesday" },
        { value: 3, label: "Thursday" },
        { value: 4, label: "Friday" },
        { value: 5, label: "Saturday" },
        { value: 6, label: "Sunday" },
      ].map((day) => (
        <label key={day.value} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
          <input type="checkbox" {...register(`work_days.${day.value}`)} value={day.value} className="rounded text-red-500 focus:ring-red-500" />
          <span className="text-sm">{day.label}</span>
        </label>
      ))}
    </div>
  </div>
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Opens At</label>
      <input
        {...register("opens_at")}
        type="time"
        defaultValue="08:00"
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Closes At</label>
      <input
        {...register("closes_at")}
        type="time"
        defaultValue="18:00"
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
      />
    </div>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Company Image</label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-500 transition cursor-pointer">
      <div className="space-y-1 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <input {...register("image")} type="file" accept="image/*" className="sr-only" id="file-upload" />
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
          >
            <span>Upload a file</span>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </div>
</div>
</div> */
}
