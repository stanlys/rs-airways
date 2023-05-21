import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFlightsCount } from 'src/app/store/selectors/shopping-cart.selector';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Input() public loggedIn$: Subject<boolean> = this.authService.loggedIn$;

  public tripsInCart$: Observable<number> = this.store.select(selectFlightsCount);

  constructor(public store: Store, private authService: AuthService) {}
}
