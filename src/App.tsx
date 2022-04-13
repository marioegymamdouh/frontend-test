import StashPointsList from "./components/StashPointsList/StashPointsList";
import {addDays} from "date-fns";
import {useState} from "react";
import {DateRange, DraftCart} from "./Data";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import {initialDateFrom} from "./constants/date";
import {isDateRangeValid} from "./util";

export type AppProps = {
  readonly children?: never
}

const getInitialDraftCart = (): DraftCart => {

  return {
    bagCount: 1,
    dateRange: { from: initialDateFrom, to: addDays(initialDateFrom, 1) },
    stashPointId: undefined,
  }
}

export const App = (_props: AppProps) => {
  const [cart, setCart] = useState<DraftCart>(getInitialDraftCart())

  const stashPointIdChangeHandler = (id: DraftCart["stashPointId"]) => {
    setCart(oldState => ({
      ...oldState,
      stashPointId: id
    }))
  };

  const dateRangeChangeHandler = (dateRange: DateRange) => {
    if (isDateRangeValid(dateRange)) {
      setCart(oldState => ({
        ...oldState,
        dateRange: dateRange
      }))
    }
  };

  return (
    <div>
      <header>
        <h1>Stasher</h1>
      </header>

      <main>
        <DateRangePicker
          dateRange={cart.dateRange}
          changeHandler={dateRangeChangeHandler}
        />

        <StashPointsList
          selectedStashPointId={cart.stashPointId}
          stashPointIdChangeHandler={stashPointIdChangeHandler}
        />
      </main>
    </div>
  )
}
