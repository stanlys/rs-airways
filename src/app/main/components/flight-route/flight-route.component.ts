// eslint-disable-next-line import/no-extraneous-dependencies
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AirportForm } from '../../../shared/models/flight-search.interfaces';
import { IFlightRouteTranslation } from '../../model/flight-route-translator.interface';

@Component({
  selector: 'app-flight-route',
  templateUrl: './flight-route.component.html',
  styleUrls: ['./flight-route.component.scss'],
})
export class FlightRouteComponent implements OnInit {
  @Input() public formGroupName!: string;

  public flightRouteForm!: FormGroup;

  constructor(private parentForm: FormGroupDirective, private translate: TranslateService) {}

  public ngOnInit(): void {
    this.flightRouteForm = this.parentForm.control.get(this.formGroupName) as FormGroup;
  }

  public switchDirection(): void {
    const fromLocControl = this.flightRouteForm.get('fromLoc');
    const toLocControl = this.flightRouteForm.get('toLoc');
    if (!fromLocControl || !toLocControl) return;

    this.flightRouteForm.setValue({
      fromLoc: toLocControl.value as AirportForm,
      toLoc: fromLocControl.value as AirportForm,
    });
  }

  public getTranslateLabel(): IFlightRouteTranslation {
    let result: IFlightRouteTranslation = { FROM: '', TO: '', LABEL_FROM: '', LABEL_TO: '' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.translate.get('MAIN_FORM').subscribe((data: IFlightRouteTranslation) => {
      result = { ...data };
    });
    return result;
  }
}
