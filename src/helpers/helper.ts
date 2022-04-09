import { monthNames } from "./constants";

export function formatDate(date: string): string {
  const dateArr = date.split("-");
  const monthNumber = parseInt(dateArr[1]) - 1;

  dateArr[1] = monthNames[monthNumber];
  dateArr.reverse();

  return dateArr.join(" ");
}

export function getItemDates(meals: MealSchedule[]): string[] {
  const itemDates = meals.map((meal) => {
    return meal.item_date;
  });

  return Array.from(new Set(itemDates));
}

export function getScheduleDates(meals: MealSchedule[]): ScheduleDates {
  let scheduleDate: ScheduleDates = {};

  meals.forEach((meal) => {
    if (!scheduleDate[meal.item_date]) scheduleDate[meal.item_date] = {};

    if (scheduleDate[meal.item_date][meal.schedule_time.split(" ")[0]])
      scheduleDate[meal.item_date][meal.schedule_time.split(" ")[0]]++;
    else scheduleDate[meal.item_date][meal.schedule_time.split(" ")[0]] = 1;
  });

  return scheduleDate;
}

export function getScheduledTimes(meals: MealSchedule[]): ScheduleTimes {
  let scheduleTime: ScheduleTimes = {};

  meals.forEach((meal) => {
    if (!scheduleTime[meal.item_date]) scheduleTime[meal.item_date] = {};

    const date = meal.schedule_time.split(" ")[0];
    const time = formatAMPM(meal.schedule_time.split(" ")[1]);

    if (!scheduleTime[meal.item_date][date])
      scheduleTime[meal.item_date][date] = {
        nine12: 0,
        twelve3: 0,
        three6: 0,
        six9: 0,
      };

    if (time.endsWith("AM")) {
      scheduleTime[meal.item_date][date].nine12++;
    } else {
      let hour = +time.split(":");
      if (hour >= 12 && hour < 3) scheduleTime[meal.item_date][date].twelve3++;
      else if (hour >= 3 && hour < 6)
        scheduleTime[meal.item_date][date].three6++;
      else scheduleTime[meal.item_date][date].six9++;
    }
  });

  return scheduleTime;
}

function formatAMPM(timeString: string) {
  let H = +timeString.substr(0, 2);
  let h = H % 12 || 12;
  let ampm = H < 12 || H === 24 ? "AM" : "PM";
  timeString = h + timeString.substr(2, 3) + ampm;

  return timeString;
}
