import { IToDo } from "../models/toDo";

export const compareDates = ( a: IToDo, b: IToDo ) => {
  if ( a.date < b.date ) {
    return -1;
  }
  if ( a.date > b.date ) {
    return 1;
  }
  return 0;
}
