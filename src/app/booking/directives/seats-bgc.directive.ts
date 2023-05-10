import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { Seats } from '../../shared/models/flight-search.interfaces';

@Directive({
  selector: '[appSeatsBgc]',
})
export class SeatsBgcDirective implements OnInit {
  @Input() public seats!: Seats;

  @HostBinding('style.background-color') private backgroundColor = '';

  public ngOnInit(): void {
    this.determineAvailability();
  }

  private determineAvailability(): void {
    const { total, avaible } = this.seats;

    if (avaible <= 10) {
      this.backgroundColor = '#b3261e4d';
    } else if (avaible <= total / 2) {
      this.backgroundColor = '#f1c9334d';
    } else {
      this.backgroundColor = '#c9e8c2';
    }
  }
}
