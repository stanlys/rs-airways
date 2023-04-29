import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Airport } from '../../model/main.interfaces';

@Component({
  selector: 'app-flight-route',
  templateUrl: './flight-route.component.html',
  styleUrls: ['./flight-route.component.scss'],
})
export class FlightRouteComponent implements OnInit {
  @Input() public formGroupName!: string;

  public flightRouteForm!: FormGroup;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.flightRouteForm = this.parentForm.control.get(this.formGroupName) as FormGroup;
  }

  public switchDirection(): void {
    console.log('switchDirection click');
    const fromForm = this.flightRouteForm.get('from');
    const toForm = this.flightRouteForm.get('to');
    if (!fromForm || !toForm) return;

    this.flightRouteForm.setValue({
      from: toForm.value as Airport,
      to: fromForm.value as Airport,
    });

    console.log(this.flightRouteForm.value);
  }
}
