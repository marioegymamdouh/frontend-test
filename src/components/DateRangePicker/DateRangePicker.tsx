import styles from "./DateRangePicker.module.css";
import {DateRange} from "../../Data";
import {addDays, format, startOfDay} from "date-fns";
import {initialDateFrom} from "../../constants/date";

interface IDateRangePickerProps {
  dateRange: DateRange,
  changeHandler: (dateRange: DateRange) => void
}

const DateRangePicker = ({
  dateRange,
  changeHandler
}: IDateRangePickerProps) => {
  return (
    <div className={styles.dateRangePicker}>
      <label>
        <span>from: </span>
        <input
          type="date"
          value={format(dateRange.from, 'yyyy-MM-dd')}
          min={format(initialDateFrom, 'yyyy-MM-dd')}
          max={format(addDays(dateRange.to, -1), 'yyyy-MM-dd')}
          onChange={e => changeHandler({
            from: startOfDay(new Date(e.target.value)),
            to: dateRange.to
          })}
        />
      </label>
      <label>
        <span>to: </span>
        <input
          type="date"
          value={format(dateRange.to, 'yyyy-MM-dd')}
          min={format(addDays(dateRange.to, 1), 'yyyy-MM-dd')}
          onChange={e => changeHandler({
            from: dateRange.from,
            to: startOfDay(new Date(e.target.value)),
          })}
        />
      </label>
    </div>
  )
};

export default DateRangePicker;