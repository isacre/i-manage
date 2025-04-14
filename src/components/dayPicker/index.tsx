"use client";
import useBookingDays from "@/hooks/useBookingDays";
import { useCompanyStore } from "@/stores/company-store";
import { SetStateFn } from "@/types";
import dayjs from "dayjs";

interface Props {
  setMonthLabel: SetStateFn<string>;
  clickedDate: dayjs.Dayjs | undefined;
  setClickedDate: SetStateFn<dayjs.Dayjs | undefined>;
}

export default function DayPicker({ setMonthLabel, clickedDate, setClickedDate }: Props) {
  const { currentWeek, handleNextWeek, handlePrevWeek, weeks } = useBookingDays({ setMonthLabel });
  const { company } = useCompanyStore();

  const dayVariants = {
    today: "border border-black text-blue-500",
    non_selected: "border text-black",
    selected: "bg-blue-500 text-white",
    disabled: "text-gray-400 cursor-default",
  };

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <button className="cursor-pointer p-2 border rounded text-center" onClick={handlePrevWeek}>
        &lt;
      </button>
      <div className="flex gap-1 overflow-auto  w-full h-full">
        {weeks[currentWeek]?.map(({ day, weekday, weekdayIndex, date }) => (
          <div
            onClick={() => {
              if (company?.work_days.indexOf(weekdayIndex) !== -1) {
                setClickedDate(date);
              }
            }}
            key={day}
            className={`flex flex-col text-center items-center justify-center w-[90px] h-[90px] rounded text-black cursor-pointer border ${
              dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && dayVariants.today
            } 
            ${company?.work_days.indexOf(weekdayIndex) === -1 && dayVariants.disabled} ${
              dayjs(date).format("DD/MM/YYYY") === dayjs(clickedDate).format("DD/MM/YYYY") && dayVariants.selected
            }`}
          >
            <div>{weekday.substring(0, 3)}</div>
            <div>{day}</div>
            {company?.work_days.indexOf(weekdayIndex) !== -1 && <div className="w-[18px] h-[5px] bg-green-600 rounded mt-2 border border-white" />}
          </div>
        ))}
      </div>
      <button className="cursor-pointer p-2 border rounded text-center" onClick={handleNextWeek}>
        &gt;
      </button>
    </div>
  );
}
