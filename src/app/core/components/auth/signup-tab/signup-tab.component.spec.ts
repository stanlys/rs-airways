import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTabComponent } from './signup-tab.component';

describe('SignupTabComponent', () => {
  let component: SignupTabComponent;
  let fixture: ComponentFixture<SignupTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
