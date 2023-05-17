import { IFlight } from './interfaces';

export const FLIGHTS: IFlight[] = [
  {
    number: 'FR 1925',
    flights: ['Dublin - Warsaw', 'Modlin - Dublin'],
    typeTrip: 'RoundTrip',
    dateTime: '1 Mar 2023, 8:40-12:00',
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
    ],
    price: 551.38,
  },
  {
    number: 'PL 1936',
    flights: ['Wroclaw - Warsaw'],
    typeTrip: 'One Way',
    dateTime: '28 Mar 2023, 8:40-12:00',
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
    ],
    price: 26.98,
  },
];
