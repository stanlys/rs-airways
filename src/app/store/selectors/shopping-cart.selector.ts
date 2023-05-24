import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISummaryFlightsStore } from '../reducers/shopping-cart.reducer';
import { SHOPPING_CART } from '../actions/shopping-cart.action';

export const selectShoppingCart = createFeatureSelector<ISummaryFlightsStore>(SHOPPING_CART);

export const selectFlights = createSelector(selectShoppingCart, (state) => state.flights);

export const selectFlightsCount = createSelector(selectShoppingCart, (state) => state.flights.length);
