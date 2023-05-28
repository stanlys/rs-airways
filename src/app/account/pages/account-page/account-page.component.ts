import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { ITrip } from 'src/app/booking/interfaces/flight';
import { SummaryService } from 'src/app/booking/services/summary.service';
import { SHOPPING_CART_COLUMNS } from 'src/app/cart/interfaces/columns';
import { PassengersListService } from 'src/app/cart/service/passengers-list.service';
import { TripListService } from 'src/app/cart/service/trip-list.service';
import { selectFlightsToProfile } from 'src/app/store/selectors/user-flight-history.selector';
import { AuthService } from '../../../core/services/auth.service';
import { PriceService } from '../../../shared/services/price.service';
import { CurrencySymbolService } from '../../../booking/services/currency-symbol.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<ITrip>([]);

  public flights$: Observable<MatTableDataSource<ITrip>> = this.store.select(selectFlightsToProfile).pipe(
    map((trip) => {
      const table = this.flights;
      table.data = trip;
      return table;
    })
  );

  public selection = new SelectionModel<ITrip>(true, []);

  @ViewChild(MatSort, { static: false }) public sort!: MatSort;

  constructor(
    public currencySymbolService: CurrencySymbolService,
    public tripList: TripListService,
    public passengerList: PassengersListService,
    private authService: AuthService,
    private store: Store,
    private route: Router,
    private summaryService: SummaryService,
    private priceService: PriceService
  ) {}

  public logout(): void {
    this.authService.logout();
  }

  public ngAfterViewInit(): void {
    this.flights.sort = this.sort;
  }

  public getTotalPrice(): number {
    return this.selection.selected
      .map((flight) => this.priceService.getPrice(flight.from.price) + this.priceService.getPrice(flight.to?.price))
      .reduce((acc, value) => acc + value, 0);
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

  public viewDetail(el: ITrip): void {
    this.summaryService.setSummary(el);
    this.route.navigate(['/booking/summary']).finally(() => {});
  }
}
