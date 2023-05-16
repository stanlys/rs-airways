import { Component, Input } from '@angular/core';
import { selectFlights } from 'src/app/reducers/reducer/shopping-cart.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Input() public loggedIn = this.authService.loggedIn;

  public inCart = 0;

  constructor(public store: Store, private authService: AuthService) {
    this.store.select(selectFlights).subscribe((data) => {
      this.inCart = data.length;
      return true;
    });
  }
}
