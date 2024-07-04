import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"

type DateOption = {
  text: string;
  value: string;
}


const getDateText = (currDate: Dayjs, todayDate: Dayjs): string => {
  return currDate.isSame(todayDate) 
    ? `Today, ${currDate.format("D MMM YYYY")}` 
    : currDate.isSame(todayDate.add(1, 'day')) 
      ? `Tomorrow, ${currDate.format("D MMM YYYY")}` 
      : currDate.format("ddd, D MMM YYYY");
}

export const useDateSelectorHook = () => {
  const [dateOptions, setDateOptions] = useState<DateOption[]>([])
  const [selectedDateOption, setSelectedDateOption] = useState<string>()
  useEffect(() => {
    const totalDays = 12
    const todayDate = dayjs()
    let currDate = dayjs()
    const options: DateOption[] = []
    for (let i = 0; i < totalDays; i++) {
      currDate = todayDate.add(i, 'day')
      const dateOption: DateOption = {
        text: getDateText(currDate, todayDate),
        value: currDate.format("DD-MM-YYYY")
      }
      options.push(dateOption)
    }
    setDateOptions(options)
  }, [])

  return {
    dateOptions,
    selectedDateOption,
    setSelectedDateOption
  }
}