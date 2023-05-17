import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { addFlightToCart, deleteFlightFromCart } from 'src/app/reducers/actions/shopping-cart.action';
import { selectFlights } from 'src/app/reducers/reducer/shopping-cart.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { addFlightToProfile } from 'src/app/reducers/actions/user-flight-history.action';
import { SHOPPING_CART_COLUMNS } from '../../interfaces/columns';
import { IFlight } from '../../interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<IFlight>([]);

  public selection = new SelectionModel<IFlight>(true, []);

  public promocode = '';

  @ViewChild(MatSort, { static: false }) public sort!: MatSort;

  constructor(private store: Store, private router: Router, private liveAnnouncer: LiveAnnouncer) {
    this.store.select(selectFlights).subscribe((data) => {
      this.flights.data = data;
      return true;
    });
  }

  public ngAfterViewInit(): void {
    this.flights.sort = this.sort;
  }

  public getTotalPrice(): number {
    return this.selection.selected.map((flight) => flight.price).reduce((acc, value) => acc + value, 0);
  }

  // временное решение для тестирования
  public addTrip(): void {
    this.store.dispatch(
      addFlightToCart({
        flight: {
          number: `FR198${Math.round(Math.random() * 20)}`,
          dateTime: '01-05-2023',
          typeTrip: 'Round trip',
          flights: ['111'],
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
    this.promocode += 1;
  }

  public pay(): void {
    this.selection.selected.forEach((fligth) => {
      this.store.dispatch(deleteFlightFromCart({ flight: fligth }));
      this.store.dispatch(addFlightToProfile({ flight: fligth }));
    });
    this.selection.clear();
  }
}
