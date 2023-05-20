import { createAction, props } from '@ngrx/store';
import { ITrip } from 'src/app/booking/interfaces/flight';

export const USER_PROFILE = 'USER-PROFILE';

export const addFlightToProfile = createAction('[USER-PROFILE Add]', props<{ flight: ITrip }>());

export const deleteFlightFromProfile = createAction('[USER-PROFILE Delete]', props<{ flight: ITrip }>());
