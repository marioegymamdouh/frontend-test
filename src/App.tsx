import StashPointsList from "./components/StashPointsList/StashPointsList";
import {addDays} from "date-fns";
import {useState} from "react";
import {DateRange, DraftCart} from "./Data";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import {initialDateFrom} from "./constants/date";
import {isBagCountValid, isDateRangeValid} from "./util";
import IntSelector from "./components/IntSelector/IntSelector";

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
  const bagCountChangeHandler = (bagCount: number) => {
    if (isBagCountValid(bagCount)) {
      setCart(oldState => ({
        ...oldState,
        bagCount: bagCount
      }))
    }
  }

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

        <IntSelector
          label={"Bag Count: "}
          value={cart.bagCount}
          changeHandler={bagCountChangeHandler}
        />

        <StashPointsList
          selectedStashPointId={cart.stashPointId}
          stashPointIdChangeHandler={stashPointIdChangeHandler}
        />
      </main>
    </div>
  )
}
