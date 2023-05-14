import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPassengerCardComponent } from './summary-passenger-card.component';

describe('SummaryPassengerCardComponent', () => {
  let component: SummaryPassengerCardComponent;
  let fixture: ComponentFixture<SummaryPassengerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryPassengerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryPassengerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
