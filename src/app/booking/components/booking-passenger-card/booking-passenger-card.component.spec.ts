import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengerCardComponent } from './booking-passenger-card.component';

describe('BookingPassengerCardComponent', () => {
  let component: BookingPassengerCardComponent;
  let fixture: ComponentFixture<BookingPassengerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPassengerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPassengerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
