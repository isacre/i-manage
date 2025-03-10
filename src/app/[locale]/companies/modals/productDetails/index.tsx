"use client";
import Modal from "@/components/modal";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: number;
}

export default function ProductDetailsModal({ isOpen, selectedProduct, setOpen }: Props) {
  const [availableHours, setAvailableHours] = useState<{ start: string; end: string }[]>([]);
  console.log(availableHours);
  useEffect(() => {
    if (selectedProduct === -1) return;

    const fetchAvailableHours = async () => {
      try {
        console.log("AQ", process.env.NEXT_PUBLIC_API_URL);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${selectedProduct}/getAvailableHours/`, {
          cache: "no-store", // Prevent caching for fresh data
        });
        if (!response.ok) throw new Error("Failed to fetch available hours");

        const data = await response.json();
        setAvailableHours(data);
      } catch (error) {
        console.error(error);
        setAvailableHours([]); // Reset available hours in case of an error
      }
    };

    fetchAvailableHours();
  }, [selectedProduct]); // Dependency on selectedProduct to fetch data again when it changes

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <h2 className="text-2xl font-bold w-[400px]">Agendar horários disponíveis</h2>
      <div className="py-3 grid grid-cols-4 gap-4">
        {availableHours.map((item) => {
          return (
            <div className="bg-green-400 p-5 w-fit rounded-2xl text-white cursor-pointer :hover" key={item.start}>{`${dayjs(item.start).format(`HH:MM`)}`}</div>
          );
        })}
      </div>
    </Modal>
  );
}
