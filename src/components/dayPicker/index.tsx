"use client";
import useBookingDays from "@/hooks/useBookingDays";
import { useCompanyStore } from "@/stores/company-store";

interface Props {
  setMonthLabel: React.Dispatch<React.SetStateAction<string>>;
}

export default function DayPicker({ setMonthLabel }: Props) {
  const { currentWeek, handleNextWeek, handlePrevWeek, weeks } = useBookingDays({ setMonthLabel });
  const { company } = useCompanyStore();

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <button className="cursor-pointer p-2 border rounded text-center" onClick={handlePrevWeek}>
        &lt;
      </button>
      <div className="flex gap-1 overflow-auto  w-full h-full">
        {weeks[currentWeek]?.map(({ day, weekday, weekdayIndex }) => (
          <div
            key={day}
            className={`flex flex-col text-center items-center justify-center w-[90px] h-[90px] rounded border ${
              company?.work_days.indexOf(weekdayIndex) !== -1 ? "text-black cursor-pointer" : "text-gray-400"
            }`}
          >
            <div>{weekday.substring(0, 3)}</div>
            <div>{day}</div>
            {company?.work_days.indexOf(weekdayIndex) !== -1 && <div className="w-[18px] h-[5px] bg-green-600 rounded mt-2" />}
          </div>
        ))}
      </div>
      <button className="cursor-pointer p-2 border rounded text-center" onClick={handleNextWeek}>
        &gt;
      </button>
    </div>
  );
}
