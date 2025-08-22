/**
 * @description Cookie utils
 * @returns Cookie utils (get, set, delete)
 */
export const Cookie = {
  get: (name: string) => {
    if (typeof window !== "undefined") {
      const value = `; ${document?.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift()
      }
    }
  },
  set: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=${value}; path=/; secure; max-age=3600`
    }
  },
  delete: (name: string) => {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=; path=/; secure; max-age=0`
    }
  },
}

/**
 * @description Calculate how many days are left until the next work day
 * @param today - Day of the week (0-6)
 * @param workDays - Days the company works
 * @returns Difference in days
 */
export function calcWeekDayDiff(today: number, workDays: number[]) {
  let diff = 0
  const weekdays = [0, 1, 2, 3, 4, 5, 6]

  if (workDays.indexOf(today) !== -1) {
    return 0
  }

  for (let i = today; workDays.indexOf(weekdays[i]) === -1; i++) {
    if (i === 6) {
      i = 0
    }
    diff += 1
  }
  return diff
}
