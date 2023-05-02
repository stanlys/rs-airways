import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormatSelectorComponent } from './date-format-selector.component';

describe('DateFormatSelectorComponent', () => {
  let component: DateFormatSelectorComponent;
  let fixture: ComponentFixture<DateFormatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFormatSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateFormatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
