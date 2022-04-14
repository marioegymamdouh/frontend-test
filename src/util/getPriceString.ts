import {Stashpoint} from '../Data';
import * as Data from './../Data'

export const getPriceString = (entity: Stashpoint) => {
  return `${Data.Price.encode(entity.bagPerDayPrice)} ${entity.currencyCode}`
}