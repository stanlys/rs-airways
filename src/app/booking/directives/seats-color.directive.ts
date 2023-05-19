import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { Seats } from '../../shared/models/flight-search.interfaces';

@Directive({
  selector: '[appSeatsColor]',
})
export class SeatsColorDirective implements OnChanges {
  @Input() public seats?: Seats;

  @Input() public selected?: boolean;

  @HostBinding('style.background-color') private backgroundColor = '';

  @HostBinding('style.border-bottom') private borderBottom = '';

  private color = '';

  constructor(private elementRef: ElementRef) {}

  public ngOnChanges(): void {
    this.color = this.determineColor();
    this.setStyles();
  }

  private setStyles(): void {
    const { classList } = this.elementRef.nativeElement as HTMLElement;

    if (classList.contains('seats')) {
      this.backgroundColor = this.color;
    }

    if (classList.contains('date-price') && this.selected) {
      this.borderBottom = `4px solid ${this.color}`;
    } else {
      this.borderBottom = '';
    }
  }

  private determineColor(): string {
    let color = '';

    if (this.seats != null) {
      const { total, avaible: available } = this.seats;

      if (available <= 10) {
        color = '#b3261e4d';
      } else if (available <= total / 2) {
        color = '#f1c9334d';
      } else {
        color = '#c9e8c2';
      }
    }

    return color;
  }
}
