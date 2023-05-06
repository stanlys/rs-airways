import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { addFlightToCart, deleteFlightFromCart } from 'src/app/reducers/actions/shopping-cart.action';
import { selectFlights } from 'src/app/reducers/reducer/shopping-cart.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addFlightToProfile } from 'src/app/reducers/actions/user-flight-history.action';
import { IFlight } from '../interfaces';
import { SHOPPING_CART_COLUMNS } from '../interfaces/columns';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<IFlight>([]);

  public selection = new SelectionModel<IFlight>(true, []);

  public promocode = '';

  constructor(private store: Store, private router: Router) {
    this.store.select(selectFlights).subscribe((data) => {
      this.flights.data = data;
      return true;
    });
  }

  public getTotalPrice(): number {
    return this.selection.selected.map((flight) => flight.price).reduce((acc, value) => acc + value, 0);
  }

  public addTrip(): void {
    this.store.dispatch(
      addFlightToCart({
        flight: {
          number: `FR198${Math.round(Math.random() * 20)}`,
          dateTime: '01-05-2023',
          typeTrip: 'Round trip',
          flights: ['111'],
          passengers: ['3333'],
          price: Math.round(Math.random() * 1000),
        },
      })
    );
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.flights.data.length;
    return numSelected === numRows;
  }

  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.flights.data);
  }

  public async editWithCheckbox(flight: IFlight): Promise<void> {
    await this.router.navigate(['/edit'], { queryParams: { flight } });
  }

  public deleteWithCheckbox(flight: IFlight): void {
    this.store.dispatch(deleteFlightFromCart({ flight }));
  }

  public applyPromoCode(): void {
    console.log('Promocode - ', this.promocode);
  }

  public pay(): void {
    this.selection.selected.forEach((fligth) => {
      this.store.dispatch(deleteFlightFromCart({ flight: fligth }));
      this.store.dispatch(addFlightToProfile({ flight: fligth }));
    });
    this.selection.clear();
  }
}
