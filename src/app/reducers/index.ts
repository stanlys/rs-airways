import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SHOPPING_CART } from './actions/shopping-cart.action';
import { IFlightsStore, shoppingCartReducer } from './reducer/shopping-cart.reducer';

export interface State {
  [SHOPPING_CART]: IFlightsStore;
}

export const reducers: ActionReducerMap<State> = {
  [SHOPPING_CART]: shoppingCartReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
