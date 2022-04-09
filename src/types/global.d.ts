declare global {
  type MealSchedule = {
    schedule_time: string;
    slot: string;
    item_date: string;
  };

  type ScheduleDates = {
    [item_date: string]: {
      [schedule_time: string]: number;
    };
  };

  type ScheduleTimes = {
    [item_date: string]: {
      [schedule_time: string]: {
        nine12: number;
        twelve3: number;
        three6: number;
        six9: number;
      };
    };
  };
}

export {};
