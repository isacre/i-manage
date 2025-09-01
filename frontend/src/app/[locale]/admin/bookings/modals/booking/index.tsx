import Modal from "@/components/modal"
import useServices from "@/hooks/useServices"
import { createBooking } from "@/services/company/booking"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { ModalProps } from "@/types"
import dayjs from "dayjs"
import { useState } from "react"
import { toast } from "react-toastify"
import DatePicker from "./datePicker"

interface Props extends ModalProps {
  fetchBookings: () => void
}

export default function BookingModal({ isOpen, setOpen, fetchBookings }: Props) {
  const today = dayjs().tz("America/Sao_Paulo")
  const { company } = useCompanyStore()
  const { services } = useServices(company?.identifier)
  const [selectedService, setSelectedService] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(today)
  const { user } = useUserStore()

  function handleSubmit() {
    const datetime =
      dayjs(`${clickedDate?.format("YYYY-MM-DD")}T${selectedHour}`).tz("America/Sao_Paulo", true) || undefined
    createBooking({
      company: company?.identifier || "",
      employees: selectedEmployee ? [Number(selectedEmployee)] : [],
      service: Number(selectedService),
      user: user?.id || undefined,
      start_date: datetime?.toISOString() || "",
      end_date:
        datetime
          ?.add(services.find((service) => service.id === Number(selectedService))?.max_duration || 0, "minutes")
          .toISOString() || "",
      status: "CONFIRMED",
    })
      .then(() => {
        setOpen(false)
        fetchBookings()
        toast.success("Booking created successfully")
      })
      .catch((err) => {
        toast.error("Error creating booking")
      })
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Booking">
      <div className="flex flex-col gap-2">
        <label>Select Service</label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-2 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {selectedService && (
          <>
            <label>Select Date</label>
            <DatePicker
              selectedServiceId={Number(selectedService)}
              clickedDate={clickedDate}
              selectedEmployee={selectedEmployee}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
              setClickedDate={setClickedDate}
              setSelectedEmployee={setSelectedEmployee}
            />
          </>
        )}
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => handleSubmit()}
        disabled={!selectedService || !selectedHour || !selectedEmployee}
      >
        Submit
      </button>
    </Modal>
  )
}
