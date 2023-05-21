import { createAction, props } from '@ngrx/store';
import { ITrip } from 'src/app/booking/interfaces/flight';

export const SHOPPING_CART = 'SHOPPING-CART';

export const addFlightToCart = createAction('[SHOPPING-CART] Add', props<{ flight: ITrip }>());

export const deleteFlightFromCart = createAction('[SHOPPING-CART] Delete', props<{ flight: ITrip }>());
