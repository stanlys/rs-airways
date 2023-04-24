export interface IFlight {
  number: string;
  flights: string[];
  typeTrip: string;
  dateTime: string;
  passengers: string[];
  price: number;
}

export const SHOPPING_CART_COLUMNS = ['number', 'flights', 'typeTrip', 'dateTime', 'passengers', 'price', 'control'];

export const FLIGHTS: IFlight[] = [
  {
    number: 'FR 1925',
    flights: ['Dublin - Warsaw', 'Modlin - Dublin'],
    typeTrip: 'RoundTrip',
    dateTime: '1 Mar 2023, 8:40-12:00',
    passengers: ['1 x Adult', '1 x Child'],
    price: 551.38,
  },
  {
    number: 'PL 1936',
    flights: ['Wroclaw - Warsaw'],
    typeTrip: 'One Way',
    dateTime: '28 Mar 2023, 8:40-12:00',
    passengers: ['1 x Adult'],
    price: 26.98,
  },
];
