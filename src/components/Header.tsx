import { formatDate } from "../helpers/helper";

type HeaderProps = {
  selectDate: string;
  setSelectDate: (value: string) => void;
  dates: string[] | undefined;
};

const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  return (
    <>
      <header className="d-flex justify-content-between p-4 bg-light">
        <h1 className="display-3">Get Meal Schedule Data</h1>
        <select
          className="form-select w-auto my-auto mx-5"
          value={props.selectDate}
          onChange={(e) => {
            props.setSelectDate(e.target.value);
          }}
        >
          <option value={"-1"} disabled>
            Select Date
          </option>
          {props.dates?.map(
            (date, index): JSX.Element => (
              <option key={index} value={date}>
                {formatDate(date)}
              </option>
            )
          )}
        </select>
      </header>
    </>
  );
};

export default Header;
