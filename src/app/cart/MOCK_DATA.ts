import { ITrip } from '../booking/interface/flight';
import { IFlight } from './interfaces';

export const FLIGHTS: ITrip[] = [
  {
    from: {
      number: 'FR 1925',
      dates: '1 Mar 2023',
      from: 'Dublin',
      to: 'Berlin',
      times: '8:40-12:00',
      price: 200,
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
      price: 350,
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

export const FLIGHTS1111: IFlight[] = [
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
