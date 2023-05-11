import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPriceElementComponent } from './total-price-element.component';

describe('TotalPriceElementComponent', () => {
  let component: TotalPriceElementComponent;
  let fixture: ComponentFixture<TotalPriceElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalPriceElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalPriceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
