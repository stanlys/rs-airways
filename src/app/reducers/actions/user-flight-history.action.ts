import { createAction, props } from '@ngrx/store';
import { IFlight } from 'src/app/cart/interfaces';

export const USER_PROFILE = 'USER-PROFILE';

export const addFlightToProfile = createAction('[USER-PROFILE Add]', props<{ flight: IFlight }>());

export const deleteFlightFromProfile = createAction('[USER-PROFILE Delete]', props<{ flight: IFlight }>());
