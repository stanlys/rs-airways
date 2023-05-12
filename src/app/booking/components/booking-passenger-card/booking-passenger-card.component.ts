import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-passenger-card',
  templateUrl: './booking-passenger-card.component.html',
  styleUrls: ['./booking-passenger-card.component.scss'],
})
export class BookingPassengerCardComponent {
  @Input() public index = 1;

  @Input() public title = 'Adult';

  // public ngOnInit(): void {}
}
