import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressControlsComponent } from './progress-controls.component';

describe('ProgressControlsComponent', () => {
  let component: ProgressControlsComponent;
  let fixture: ComponentFixture<ProgressControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
