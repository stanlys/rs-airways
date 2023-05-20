import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-process-passenger-card',
  templateUrl: './process-passenger-card.component.html',
  styleUrls: ['./process-passenger-card.component.scss'],
})
export class ProcessPassengerCardComponent {
  @Input() public index = 1;

  @Input() public title = 'Adult';

  public tooltip = `Add the passenger's name as it is written on their documents (passport or ID). Do not use any accents or special characters. Do not use a nickname.`;

  public luggageAmount = 0;

  public passenger!: FormGroup;

  // public ngOnInit(): void {}
}
