import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

import { ITrip } from 'src/app/booking/interfaces/flight';
import { deleteFlightFromCart } from 'src/app/store/actions/shopping-cart.action';
import { addFlightToProfile } from 'src/app/store/actions/user-flight-history.action';
import { selectFlights } from 'src/app/store/selectors/shopping-cart.selector';
import { CurrencySymbolService } from '../../../booking/services/currency-symbol.service';
import { CurrencyCode } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';
import { IFlight } from '../../interfaces';
import { SHOPPING_CART_COLUMNS } from '../../interfaces/columns';
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

  public currencyCode$;

  public locale = this.translate.currentLang;

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
    public passengerList: PassengersListService,
    public tripList: TripListService,
    public translate: TranslateService,
    public currencySymbolService: CurrencySymbolService,
    private store: Store,
    private router: Router,
    private priceService: PriceService
  ) {
    this.currencyCode$ = this.priceService.currencyCode$;
  }

  public ngAfterViewInit(): void {
    this.flights.sort = this.sort;
  }

  public getTotalPrice(code: CurrencyCode = this.currencyCode$.getValue()): number {
    const result = this.selection.selected
      .map((flight) => this.tripList.getPrice(flight))
      .reduce((acc, value) => this.priceService.sumPrice(acc, value), this.priceService.initPrice);

    return this.priceService.getPrice(result, code);
  }

  public getNumberPrice(trip: ITrip, code: CurrencyCode = this.currencyCode$.getValue()): number {
    const price = this.tripList.getPrice(trip);
    return this.priceService.getPrice(price, code);
  }

  public addTrip(): void {
    this.router.navigate(['booking']).catch(console.error);
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
    });
    this.selection.selected.forEach((flight) => {
      this.store.dispatch(addFlightToProfile({ flight }));
    });
    this.selection.clear();
    this.router.navigate(['profile']).catch(console.error);
  }
}
