import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersFieldComponent } from './passengers-field.component';

describe('PassengersFieldComponent', () => {
  let component: PassengersFieldComponent;
  let fixture: ComponentFixture<PassengersFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengersFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengersFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
