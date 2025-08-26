import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

export default function useFormatedDates(date: string) {
  const formatedDate = dayjs(date).tz("America/Sao_Paulo")
  return {
    dayOfWeek: formatedDate.format("dddd"),
    year: formatedDate.format("YYYY"),
    month: formatedDate.format("MM"),
    day: formatedDate.format("DD"),
    hour: formatedDate.format("HH"),
    minute: formatedDate.format("mm"),
  }
}
