import { Component } from '@angular/core';
import { FLIGHTS, IFlight, SHOPPING_CART_COLUMNS } from '../MOCK_DATA';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights: IFlight[] = FLIGHTS;

  public getTotalPrice(): number {
    return this.flights.map((flight) => flight.price).reduce((acc, value) => acc + value, 0);
  }

  public addTrip(): void {
    console.log('add new trip to ', this.flights);
  }

  public showControlMenu(): void {
    console.log('control menu ', this.flights);
  }
}
