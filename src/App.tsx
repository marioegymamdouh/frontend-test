import StashPointsList from './components/StashPointsList/StashPointsList';
import {addDays} from 'date-fns';
import {useEffect, useState} from 'react';
import {Cart, DateRange, DraftCart, PriceQuote} from './Data';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import {initialDateFrom} from './constants/date';
import {isBagCountValid, isDateRangeValid} from './util';
import IntSelector from './components/IntSelector/IntSelector';
import * as Data from './Data'
import PriceQuoteCTA from "./components/PriceQuoteCTA/PriceQuoteCTA";

export type AppProps = {
  readonly children?: never
}

const getInitialDraftCart = (): DraftCart => {
  return {
    bagCount: 1,
    dateRange: { from: initialDateFrom, to: addDays(initialDateFrom, 1) },
    stashpointId: undefined,
  }
}

export const App = (_props: AppProps) => {
  const [cart, setCart] = useState<DraftCart>(getInitialDraftCart());
  const [priceQuote, setPriceQuote] = useState<PriceQuote>();
  const [isPriceQuoteLoading, setIsPriceQuoteLoading] = useState(false);

  useEffect(() => {
    if (
      cart.bagCount && isBagCountValid(cart.bagCount) &&
      cart.dateRange && isDateRangeValid(cart.dateRange) &&
      cart.stashpointId
    ) {
      fetchPriceQuote(cart).then((priceQuote: PriceQuote | undefined) => {
        if (priceQuote) setPriceQuote(priceQuote)
      });
    }
  }, [cart])

  const stashPointIdChangeHandler = (id: DraftCart['stashpointId']) => {
    setCart(oldState => ({
      ...oldState,
      stashpointId: id
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
  };
  const fetchPriceQuote = async (cart: Cart | DraftCart) => {
    setIsPriceQuoteLoading(true);
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(cart)
    });
    const formattedResponse = await response.json();
    const [errors, priceQuote] = Data.PriceQuote.decode(formattedResponse);
    setIsPriceQuoteLoading(false);
    if (errors) {
      alert(errors);
      return undefined;
    }
    return priceQuote;
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

        <IntSelector
          label={'Bag Count: '}
          value={cart.bagCount}
          changeHandler={bagCountChangeHandler}
        />

        <PriceQuoteCTA
          priceQuote={priceQuote}
          isLoading={isPriceQuoteLoading}
        />

        <StashPointsList
          selectedStashPointId={cart.stashpointId}
          stashPointIdChangeHandler={stashPointIdChangeHandler}
        />
      </main>
    </div>
  )
}
