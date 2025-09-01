import { useCompanyStore } from "@/stores/company-store"
import FormFields from "@/components/formFields"
import React from "react"
import { CompanyType, WeekDays } from "@/types"
import WorkDaysToggle from "./weekDaysToggle"

export default function CompanyFormFields() {
  const { company, update } = useCompanyStore()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <FormFields.ControlledTextField
        id="name"
        label="Name"
        value={company?.name}
        onChange={(e) => update({ ...company, name: e.target.value } as CompanyType)}
        autoComplete="off"
      />
      <FormFields.ControlledTextField
        id="description"
        label="Description"
        value={company?.description}
        onChange={(e) => update({ ...company, description: e.target.value } as CompanyType)}
        autoComplete="off"
      />
      <FormFields.ControlledTextField
        id="address"
        label="Address"
        value={company?.address}
        onChange={(e) => update({ ...company, address: e.target.value } as CompanyType)}
        autoComplete="off"
      />
      <FormFields.ControlledTextField
        id="phone"
        label="Phone"
        value={company?.phone}
        onChange={(e) => update({ ...company, phone: e.target.value } as CompanyType)}
        autoComplete="off"
      />
      <div className="col-span-full w-full">
        <WorkDaysToggle />
      </div>
    </div>
  )
}
