import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlightsCount } from 'src/app/store/selectors/shopping-cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public tripsInCart$: Observable<number> = this.store.select(selectFlightsCount);

  constructor(public store: Store) {}
}
