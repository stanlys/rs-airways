import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { selectFlights } from 'src/app/reducers/reducer/shopping-cart.reducer';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { IFlight } from '../interfaces';
import { SHOPPING_CART_COLUMNS } from '../interfaces/columns';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements AfterViewInit {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS;

  public flights = new MatTableDataSource<IFlight>([]);

  public selection = new SelectionModel<IFlight>(true, []);

  @ViewChild(MatSort, { static: false }) public sort!: MatSort;

  constructor(private store: Store) {
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
}
