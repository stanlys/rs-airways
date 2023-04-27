import { createAction, createReducer, on, props } from '@ngrx/store';
import { IFlight } from 'src/app/shopping-cart/interfaces';

export const SHOPPING_CART = 'SHOPPING-CART';

export const addFlightToCart = createAction('[SHOPPING-CART Add]', props<{ flight: IFlight }>);

export const deleteFlightFromCart = createAction('[SHOPPING-CART Delete]', props<{ flight: IFlight }>);

export interface IFlightsStore {
  flights: Array<IFlight>;
}

export const INITIAL_STORE: IFlightsStore = {
  flights: [],
};

export const shoppingCartReducer = createReducer<IFlightsStore>(
  INITIAL_STORE,
  on(addFlightToCart, (state, action): IFlightsStore => ({ ...state, flights: [] }))
);
