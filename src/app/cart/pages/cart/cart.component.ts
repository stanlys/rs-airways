import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { addFlightToCart, deleteFlightFromCart } from 'src/app/store/actions/shopping-cart.action';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectFlights } from 'src/app/store/selectors/shopping-cart.selector';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Observable, map } from 'rxjs';
import { ITrip } from 'src/app/booking/interfaces/flight';
import { addFlightToProfile } from 'src/app/store/actions/user-flight-history.action';
import { SHOPPING_CART_COLUMNS } from '../../interfaces/columns';
import { IFlight } from '../../interfaces';
import { PassengersListService } from '../../service/passengers-list.service';
import { TripListService } from '../../service/trip-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<ITrip>([]);

  public selection = new SelectionModel<ITrip>(true, []);

  public promocode = '';

  public tripInCart$: Observable<MatTableDataSource<ITrip>> = this.store.select(selectFlights).pipe(
    map((trip) => {
      const table = this.flights;
      table.data = trip;
      return table;
    })
  );

  @ViewChild(MatSort, { static: false }) public sort!: MatSort;

  constructor(
    private store: Store,
    private router: Router,
    public passengerList: PassengersListService,
    public tripList: TripListService,
    public translate: TranslateService
  ) {}

  public ngAfterViewInit(): void {
    this.flights.sort = this.sort;
  }

  public getTotalPrice(): number {
    return this.selection.selected
      .map((flight) => flight.from.price + (flight.to?.price || 0))
      .reduce((acc, value) => acc + value, 0);
    return 0;
  }

  // временное решение для тестирования
  public addTrip(): void {
    this.store.dispatch(
      addFlightToCart({
        flight: {
          from: {
            number: 'FR 1999',
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
            number: 'FR 1926',
            dates: '1 Mar 2023',
            from: 'Dublin',
            to: 'Berlin',
            times: '8:40-12:00',
            price: 50,
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
    await this.router.navigate(['/booking/flights'], { queryParams: { flight: JSON.stringify(flight) } });
  }

  public deleteWithCheckbox(flight: ITrip): void {
    this.store.dispatch(deleteFlightFromCart({ flight }));
  }

  public applyPromoCode(): void {
    this.promocode += 1;
  }

  public pay(): void {
    this.selection.selected.forEach((flight) => {
      this.store.dispatch(deleteFlightFromCart({ flight }));
      this.store.dispatch(addFlightToProfile({ flight }));
    });
    this.selection.clear();
  }
}
