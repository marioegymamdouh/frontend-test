import {addDays, startOfDay} from "date-fns";

export const initialDateFrom = addDays(startOfDay(new Date()), 1)