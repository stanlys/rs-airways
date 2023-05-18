import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { SHOPPING_CART_COLUMNS } from 'src/app/cart/interfaces/columns';
import { Store } from '@ngrx/store';
import { IFlight } from 'src/app/cart/interfaces';
import { selectFlightsToProfile } from 'src/app/reducers/reducer/user-flight-history.reducer';
import { Router } from '@angular/router';
import { SummaryService } from 'src/app/booking/service/summary.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<IFlight>([]);

  public selection = new SelectionModel<IFlight>(true, []);

  @ViewChild(MatSort, { static: false }) public sort!: MatSort;

  constructor(
    private authService: AuthService,
    private store: Store,
    private route: Router,
    private summaryService: SummaryService
  ) {
    this.store.select(selectFlightsToProfile).subscribe((data) => {
      this.flights.data = data;
      return true;
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public ngAfterViewInit(): void {
    this.flights.sort = this.sort;
  }

  public getTotalPrice(): number {
    return this.selection.selected.map((flight) => flight.price).reduce((acc, value) => acc + value, 0);
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

  public viewDetail(el: IFlight): void {
    this.summaryService.setSummary(el);
    this.route.navigate(['/booking/summary']).finally(() => {});
  }
}
