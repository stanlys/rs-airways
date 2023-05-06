import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { deleteFlightFromCart } from 'src/app/reducers/actions/shopping-cart.action';
import { selectFlights } from 'src/app/reducers/reducer/shopping-cart.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SHOPPING_CART_COLUMNS } from '../MOCK_DATA';
import { IFlight } from '../interfaces';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent {
  public displayedColumns: string[] = SHOPPING_CART_COLUMNS.filter((el) => el !== 'control');

  public flights = new MatTableDataSource<IFlight>([]);

  public selection = new SelectionModel<IFlight>(true, []);

  constructor(private store: Store, private router: Router) {
    this.store.select(selectFlights).subscribe((data) => {
      this.flights.data = data;
      return true;
    });
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

  public async editWithCheckbox(flight: IFlight): Promise<void> {
    await this.router.navigate(['/edit'], { queryParams: { flight } });
  }

  public deleteWithCheckbox(flight: IFlight): void {
    this.store.dispatch(deleteFlightFromCart({ flight }));
  }
}
