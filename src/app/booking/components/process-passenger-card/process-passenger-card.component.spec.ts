import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPassengerCardComponent } from './process-passenger-card.component';

describe('BookingPassengerCardComponent', () => {
  let component: ProcessPassengerCardComponent;
  let fixture: ComponentFixture<ProcessPassengerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessPassengerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessPassengerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
