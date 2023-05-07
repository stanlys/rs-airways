import { Component } from '@angular/core';
import { SUMMART_FLIGHT, SUMMARY_PASSENGER_TEST } from './MOCK_DATA_summary_page';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public passengers = SUMMARY_PASSENGER_TEST;

  public flights = SUMMART_FLIGHT;
}
