import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsCalendarDateComponent } from './flights-calendar-date.component';

describe('FlightsCalendarDateComponent', () => {
  let component: FlightsCalendarDateComponent;
  let fixture: ComponentFixture<FlightsCalendarDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsCalendarDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsCalendarDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
