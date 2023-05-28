import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { ITrip } from 'src/app/booking/interfaces/flight';
import { SummaryService } from 'src/app/booking/services/summary.service';
import { SHOPPING_CART_COLUMNS } from 'src/app/cart/interfaces/columns';
import { PassengersListService } from 'src/app/cart/service/passengers-list.service';
import { TripListService } from 'src/app/cart/service/trip-list.service';
import { selectFlightsToProfile } from 'src/app/store/selectors/user-flight-history.selector';
import { CurrencySymbolService } from '../../../booking/services/currency-symbol.service';
import { AuthService } from '../../../core/services/auth.service';
import { CurrencyCode } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<ITrip>([]);

  public currencyCode$;

  public locale = this.translateService.currentLang;

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
    private authService: AuthService,
    private store: Store,
    private route: Router,
    private summaryService: SummaryService,
    public tripList: TripListService,
    public passengerList: PassengersListService,
    private priceService: PriceService,
    public currency: CurrencySymbolService,
    private translateService: TranslateService
  ) {
    this.currencyCode$ = this.priceService.currencyCode$;
  }

  public logout(): void {
    this.authService.logout();
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
