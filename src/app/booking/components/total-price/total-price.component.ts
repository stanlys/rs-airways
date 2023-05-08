import { AfterViewInit, Component, Input } from '@angular/core';
import { ISummaryFlight } from '../../interface/flight';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
})
export class TotalPriceComponent implements AfterViewInit {
  @Input() public flights!: Array<ISummaryFlight>;

  public getSummaryByAge(): void {
    const result: Array<number> = [];
    const adult = new Map<string, { fare: number; tax: number }>();
    const child = new Map();
    const infant = new Map();
    this.flights.forEach((flight) => {
      flight.passengers.forEach((passenger) => {
        if (passenger.age >= 18) {
          if (adult.has(passenger.nameFull)) {
            const price = adult.get(passenger.nameFull) || { tax: 0, fare: 0 };
            adult.set(passenger.nameFull, { fare: price.fare + passenger.fare, tax: price.tax + passenger.tax });
          } else {
            adult.set(passenger.nameFull, { fare: passenger.fare, tax: passenger.tax });
          }
        } else if (passenger.age <= 7) {
          infant.set(passenger.nameFull, { fare: passenger.fare, tax: passenger.tax });
        } else {
          child.set(passenger.nameFull, { fare: passenger.fare, tax: passenger.tax });
        }
      });
      console.log(adult);
    });
    console.log(result);
  }

  public ngAfterViewInit(): void {
    this.getSummaryByAge();
  }
}
