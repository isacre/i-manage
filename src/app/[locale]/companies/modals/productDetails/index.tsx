"use client";
import DayPicker from "@/components/dayPicker";
import Modal from "@/components/modal";
import { SetStateFn, WeekDays } from "@/types";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: SetStateFn<boolean>;
  selectedProduct: number;
  companyWorkDays: WeekDays[];
}

export default function ProductDetailsModal({ isOpen, selectedProduct, setOpen, companyWorkDays }: Props) {
  const [ClickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(undefined);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [DateLabel, setDateLabel] = useState("");
  const t = useTranslations("Months");

  useEffect(() => {
    if (selectedProduct === -1) return;

    const fetchAvailableHours = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${selectedProduct}/getAvailableHours/`, {
          cache: "no-store", // Prevent caching for fresh data
        });
        if (!response.ok) throw new Error("Failed to fetch available hours");

        const data = await response.json();
        setAvailableHours(data);
      } catch (error) {
        console.error(error);
        setAvailableHours([]);
      }
    };

    fetchAvailableHours();
  }, [selectedProduct]);

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <h2 className="text-2xl font-bold w-full text-center mb-2">
        {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
      </h2>
      <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
    </Modal>
  );
}
