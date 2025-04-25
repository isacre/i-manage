"use client"
import { useCompanyStore } from "@/stores/company-store"
import { CompanyType } from "@/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdStar } from "react-icons/md"
import ProductDetailsModal from "../modals/productDetails"
import ProductCard from "@/components/productCard"
import useServices from "@/hooks/useServices"

interface Props {
  selectedCompany: CompanyType | undefined
}
export default function CompanyDetails({ selectedCompany }: Props) {
  const [ProductDetailsModalOpen, setProductDetailsModal] = useState(false)
  const [ProductClicked, setProductClicked] = useState(-1)
  const { services, servicesLoading } = useServices(selectedCompany?.id)

  function handleOpeningModalWithId(id: number) {
    setProductClicked(id)
    setProductDetailsModal(true)
  }

  return (
    <div>
      <ProductDetailsModal
        companyWorkDays={selectedCompany?.work_days || []}
        selectedProduct={ProductClicked}
        isOpen={ProductDetailsModalOpen}
        setOpen={setProductDetailsModal}
      />
      <div className="flex items-center gap-5">
        <Image
          className="h-[80px] w-[80px] rounded-full border-1 border-gray-400 object-cover"
          width={80}
          height={80}
          alt={selectedCompany?.name || ""}
          src={"https://www.cliquemedicos.com.br/blog/wp-content/uploads/2020/01/Cl%C3%ADnico-M%C3%A9dico-scaled.jpg"}
        />
        <b className="text-[24px] font-light">{selectedCompany?.name}</b>-
        <p className="flex items-center gap-2 text-yellow-400">
          <MdStar />
          {4.6}
        </p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ProductCard onClick={handleOpeningModalWithId} service={service} key={service.name} />
        ))}
      </div>
    </div>
  )
}
