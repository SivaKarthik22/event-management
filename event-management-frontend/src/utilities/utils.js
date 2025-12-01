import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertAndFormatDay = (inputDate, inputTime, fromTimezone, toTimezone) => {
    const day = dayjs(`${inputDate} ${inputTime}`);
    console.log(day);
    const inputDay = dayjs.tz(day, fromTimezone);
    console.log(inputDay);
    const convertedDay = inputDay.tz(toTimezone);
    console.log(convertedDay);
    return convertedDay.format("MMM DD, YYYY | hh:mm A");
}

export const formatDay = (date, toTimezone) => {
    return dayjs(date).tz(toTimezone).format("MMM DD, YYYY | hh:mm A");
}