import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-booking-passenger-card',
  templateUrl: './booking-passenger-card.component.html',
  styleUrls: ['./booking-passenger-card.component.scss'],
})
export class BookingPassengerCardComponent {
  @Input() public index = 1;

  @Input() public title = 'Adult';

  public tooltip = `Add the passenger's name as it is written on their documents (passport or ID). Do not use any accents or special characters. Do not use a nickname.`;

  // public ngOnInit(): void {}
}
