import {Stashpoint} from '../Data';
import {defaultLocale} from "../constants/locales";

export const getPriceString = (entity: Stashpoint) => {
  return new Intl.NumberFormat(defaultLocale, { style: 'currency', currency: entity.currencyCode }).format(entity.bagPerDayPrice)
}