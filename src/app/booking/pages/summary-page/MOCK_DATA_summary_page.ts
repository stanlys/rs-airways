import { ITrip } from '../../interfaces/flight';
import { IPassenger } from '../../interfaces/passenger';

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

export const SUMMART_TRIP: Array<ITrip> = [
  {
    from: {
      number: 'FR 1925',
      dates: '1 Mar 2023',
      from: 'Dublin',
      to: 'Berlin',
      times: '8:40-12:00',
      price: {
        usd: 200,
        rub: 200,
        eur: 200,
        pln: 200,
      },
      passengers: [
        {
          nameFull: 'Harry Potter',
          age: 20,
          cabinBag: 10,
          fare: 10,
          luggage: 23,
          seat: '19A',
          tax: 12.2,
        },
        {
          nameFull: 'Harry Potter mini',
          age: 1,
          cabinBag: 10,
          fare: 10,
          luggage: 23,
          seat: '19A',
          tax: 12.2,
        },
      ],
    },
    to: {
      number: 'FR 1989',
      dates: '1 Mar 2023',
      from: 'Dublin',
      to: 'Berlin',
      times: '8:40-12:00',
      price: {
        usd: 350,
        rub: 350,
        eur: 350,
        pln: 350,
      },
      passengers: [
        {
          nameFull: 'Harry Potter',
          age: 20,
          cabinBag: 10,
          fare: 10,
          luggage: 23,
          seat: '19A',
          tax: 12.2,
        },
        {
          nameFull: 'Harry Potter mini',
          age: 1,
          cabinBag: 10,
          fare: 10,
          luggage: 23,
          seat: '19A',
          tax: 12.2,
        },
      ],
    },
  },
];
