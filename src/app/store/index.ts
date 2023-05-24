import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SHOPPING_CART } from './actions/shopping-cart.action';
import { ISummaryFlightsStore, shoppingCartReducer } from './reducers/shopping-cart.reducer';
import { USER_PROFILE } from './actions/user-flight-history.action';
import { IFlightsStore, userProfileReducer } from './reducers/user-flight-history.reducer';

export interface State {
  [SHOPPING_CART]: ISummaryFlightsStore;
  [USER_PROFILE]: IFlightsStore;
}

export const reducers: ActionReducerMap<State> = {
  [SHOPPING_CART]: shoppingCartReducer,
  [USER_PROFILE]: userProfileReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
