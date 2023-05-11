import { Component, Input } from '@angular/core';
import { ISummaryFlight } from '../../interface/flight';

@Component({
  selector: 'app-summary-passenger-card',
  templateUrl: './summary-passenger-card.component.html',
  styleUrls: ['./summary-passenger-card.component.scss'],
})
export class SummaryPassengerCardComponent {
  @Input() public flight!: ISummaryFlight;
}
