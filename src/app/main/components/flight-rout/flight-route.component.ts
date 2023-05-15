import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Airport } from '../../model/main.interfaces';
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
    const fromForm = this.flightRouteForm.get('from');
    const toForm = this.flightRouteForm.get('to');
    if (!fromForm || !toForm) return;

    this.flightRouteForm.setValue({
      from: toForm.value as Airport,
      to: fromForm.value as Airport,
    });
  }

  public getTranslateLabel(): IFlightRouteTranslation {
    let result: IFlightRouteTranslation = { FROM: '', TO: '', LABEL_FROM: '', LABEL_TO: '' };
    this.translate.get('MAIN_FORM').subscribe((data: IFlightRouteTranslation) => {
      result = { ...data };
    });
    return result;
  }
}
