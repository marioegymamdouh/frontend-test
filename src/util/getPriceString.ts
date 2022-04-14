import {Price, PriceQuote, Stashpoint} from '../Data';
import {defaultLocale} from '../constants/locales';

type HavePrice = Stashpoint | PriceQuote;

export const getPriceString = (entity: HavePrice) => {
  let price: Price;

  if ("bagPerDayPrice" in entity)
    price = entity.bagPerDayPrice
  else if ("totalPrice" in entity)
    price = entity.totalPrice
  else return;

  return new Intl.NumberFormat(defaultLocale, {
      style: 'currency',
      currency: entity.currencyCode
  }).format(price)
}