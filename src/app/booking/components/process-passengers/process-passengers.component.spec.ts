import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPassengersComponent } from './process-passengers.component';

describe('PassengersComponent', () => {
  let component: ProcessPassengersComponent;
  let fixture: ComponentFixture<ProcessPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessPassengersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
