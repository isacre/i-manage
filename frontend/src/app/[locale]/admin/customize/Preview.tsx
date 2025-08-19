import CompanyLayout from "@/app/[locale]/(user)/layout"
import CompanyPage from "@/app/[locale]/(user)/page"
import { CompanyType } from "@/types"

type Props = {
  company: CompanyType | null
}

export default function Preview({ company }: Props) {
  if (!company) return null
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-8 h-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <CompanyLayout>
          <CompanyPage />
        </CompanyLayout>
      </div>
    </div>
  )
}
