import { Component, Input, OnInit } from '@angular/core';
import { ISummaryFare, ISummaryFlight } from '../../interface/flight';
import { SummaryService } from '../../service/summary.service';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
})
export class TotalPriceComponent implements OnInit {
  @Input() public flights!: Array<ISummaryFlight>;

  public summaryByAge?: Array<ISummaryFare>;

  private fares = ['Adult Fare', 'Child Fare', 'Infant Fare'];

  constructor(public summaryService: SummaryService) {}

  public ngOnInit(): void {
    this.summaryByAge = this.summaryService.getSummaryByAge(this.flights);
  }

  public getCaption(count: number, index: number): string {
    return `${count} x ${this.fares[index]}`;
  }
}
