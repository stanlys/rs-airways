import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.scss'],
})
export class FlightSelectComponent {
  @Input() public flight!: Flight;

  @Input() public confirmed!: boolean;

  @Output() public confirmedChange = new EventEmitter<boolean>();

  public onClick(): void {
    this.confirmedChange.emit(!this.confirmed);
  }
}
