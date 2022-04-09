import { useEffect, useState } from "react";
import Header from "../components/Header";
import ItemDateGraph from "../components/ItemDateGraph";
import ScheduleDateGraph from "../components/ScheduleDateGraph";
import ScheduleTimeGraph from "../components/ScheduleTimeGraph";
import {
  getItemDates,
  getScheduleDates,
  getScheduledTimes,
} from "../helpers/helper";
import { getMealData } from "../services/services";

const App: React.FC = (): JSX.Element => {
  const [mealsSchedule, setMealsSchedule] = useState<MealSchedule[]>();
  const [selectDate, setSelectDate] = useState<string>("-1");
  const [selectScheduleDate, setSelectScheduleDate] = useState<string>("-1");
  const [itemDates, setItemDates] = useState<string[]>();
  const [scheduleDates, setScheduleDates] = useState<ScheduleDates>({});
  const [scheduleTimes, setScheduleTimes] = useState<ScheduleTimes>();

  useEffect(() => {
    const meals = getMealData();

    setMealsSchedule(meals);
    setItemDates(getItemDates(meals));
    setScheduleDates(getScheduleDates(meals));
    setScheduleTimes(getScheduledTimes(meals));
  }, []);

  return (
    <div className="d-flex flex-column mx-auto">
      <Header
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        dates={itemDates}
      />
      <ItemDateGraph
        dates={itemDates}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setSelectScheduleDate={setSelectScheduleDate}
      />
      {selectDate !== "-1" && (
        <ScheduleDateGraph
          scheduleDates={scheduleDates}
          selectDate={selectDate}
          setSelectScheduleDate={setSelectScheduleDate}
        />
      )}
      {selectScheduleDate !== "-1" && (
        <ScheduleTimeGraph
          scheduleTimes={scheduleTimes || {}}
          selectScheduleDate={selectScheduleDate}
          selectDate={selectDate}
        />
      )}
    </div>
  );
};

export default App;
