import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportFieldComponent } from './airport-field.component';

describe('AirportFieldComponent', () => {
  let component: AirportFieldComponent;
  let fixture: ComponentFixture<AirportFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
