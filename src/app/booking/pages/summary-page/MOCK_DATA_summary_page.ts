import { ISummaryFlight } from '../../interfaces/summary-flight';
import { IPassenger } from '../../interfaces/summary-passenger';

export const SUMMARY_PASSENGER_TEST: Array<IPassenger> = [
  {
    nameFull: 'Harry Potter',
    cabinBag: 1,
    luggage: 1,
    seat: '19E',
    age: 18,
    fare: 83,
    tax: 45.5,
  },
  {
    nameFull: 'Lili Potter',
    cabinBag: 1,
    luggage: 1,
    seat: '20E',
    age: 16,
    fare: 53,
    tax: 45.04,
  },
  {
    nameFull: 'James Potter',
    cabinBag: 1,
    luggage: 1,
    seat: '21E',
    fare: 44,
    tax: 5.5,
    age: 3,
  },
];

export const SUMMART_FLIGHT: Array<ISummaryFlight> = [
  {
    from: 'Dublin',
    to: 'Warsaw Moldin',
    dates: 'Wednesday, 1 March, 2023',
    times: '8:40 - 12:00',
    number: 'FR 1925',
    passengers: SUMMARY_PASSENGER_TEST,
  },
  {
    to: 'Dublin',
    from: 'Warsaw Moldin',
    dates: 'Wednesday, 18 March, 2023',
    times: '7:40 - 11:10',
    number: 'FR 1935',
    passengers: SUMMARY_PASSENGER_TEST,
  },
];
