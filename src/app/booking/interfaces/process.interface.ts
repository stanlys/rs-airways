export interface IContacts {
  countryCode: string;
  phone: string;
  email: string;
}

export interface PassengersFormValue {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  type: 'Adult' | 'Child' | 'Infant';
  luggage: number;
  assistance: boolean;
}
