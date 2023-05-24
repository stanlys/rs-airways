import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFlightsStore } from '../reducers/user-flight-history.reducer';
import { USER_PROFILE } from '../actions/user-flight-history.action';

export const selectShoppingCart = createFeatureSelector<IFlightsStore>(USER_PROFILE);

export const selectFlightsToProfile = createSelector(selectShoppingCart, (state) => state.flights);

export const selectFlightsToProfileCount = createSelector(selectShoppingCart, (state) => state.flights.length);
