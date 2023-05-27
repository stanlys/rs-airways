import { createReducer, on } from '@ngrx/store';
import { ITrip } from 'src/app/booking/interfaces/flight';
import { addFlightToCart, deleteFlightFromCart } from '../actions/shopping-cart.action';

export interface ISummaryFlightsStore {
  flights: Array<ITrip>;
}

export const INITIAL_STORE: ISummaryFlightsStore = {
  flights: [],
};

export const shoppingCartReducer = createReducer<ISummaryFlightsStore>(
  INITIAL_STORE,
  on(addFlightToCart, (state, { flight }): ISummaryFlightsStore => ({ flights: [...state.flights, flight] })),
  on(
    deleteFlightFromCart,
    (state, { flight }): ISummaryFlightsStore => ({
      flights: state.flights.filter((_flight) => _flight.from.number !== flight.from.number),
    })
  )
);
