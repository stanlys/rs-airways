import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsCalendarDestinationComponent } from './flights-calendar-destination.component';

describe('FlightsCalendarDestinationComponent', () => {
  let component: FlightsCalendarDestinationComponent;
  let fixture: ComponentFixture<FlightsCalendarDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsCalendarDestinationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsCalendarDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
