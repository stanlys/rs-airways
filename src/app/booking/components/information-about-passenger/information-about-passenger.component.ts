import { Component, Input } from '@angular/core';
import { IPassenger } from '../../interface/passenger';

@Component({
  selector: 'app-information-about-passenger',
  templateUrl: './information-about-passenger.component.html',
  styleUrls: ['./information-about-passenger.component.scss'],
})
export class InformationAboutPassengerComponent {
  @Input() public passenger!: IPassenger;
}
