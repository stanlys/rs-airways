import { createAction, props } from '@ngrx/store';
import { ISummaryTrip } from 'src/app/booking/interface/flight';

export const SHOPPING_CART = 'SHOPPING-CART';

export const addFlightToCart = createAction('[SHOPPING-CART Add]', props<{ flight: ISummaryTrip }>());

export const deleteFlightFromCart = createAction('[SHOPPING-CART Delete]', props<{ flight: ISummaryTrip }>());

// import { createAction, props } from '@ngrx/store';
// import { IFlight } from 'src/app/cart/interfaces';

// export const SHOPPING_CART = 'SHOPPING-CART';

// export const addFlightToCart = createAction('[SHOPPING-CART Add]', props<{ flight: IFlight }>());

// export const deleteFlightFromCart = createAction('[SHOPPING-CART Delete]', props<{ flight: IFlight }>());
