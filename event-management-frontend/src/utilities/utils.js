import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertAndFormatDay = (inputDate, inputTime, fromTimezone, toTimezone) => {
    const day = dayjs(`${inputDate} ${inputTime}`);
    const inputDay = dayjs.tz(day, fromTimezone);
    const convertedDay = inputDay.tz(toTimezone);
    return convertedDay.format("MMM DD, YYYY | hh:mm A");
}

export const formatDay = (dateAndTime, toTimezone) => {
    return dayjs(dateAndTime).tz(toTimezone).format("MMM DD, YYYY | hh:mm A");
}