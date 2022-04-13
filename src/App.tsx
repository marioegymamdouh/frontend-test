import StashPointsList from "./components/StashPointsList/StashPointsList";
import {addDays, startOfDay} from "date-fns";
import {useState} from "react";
import {DraftCart} from "./Data";

export type AppProps = {
  readonly children?: never
}

const getInitialDraftCart = (): DraftCart => {
  const initialDateFrom = addDays(startOfDay(new Date()), 1)

  return {
    bagCount: 1,
    dateRange: { from: initialDateFrom, to: addDays(initialDateFrom, 1) },
    stashPointId: undefined,
  }
}

export const App = (_props: AppProps) => {
  const [cart, setCart] = useState<DraftCart>(getInitialDraftCart())

  return (
    <div>
      <header>
        <h1>Stasher</h1>
      </header>

      <main>
        <StashPointsList
          cart={cart}
          setCart={setCart}
        />
      </main>
    </div>
  )
}
