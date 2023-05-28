import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessContactDetailsComponent } from './process-contact-details.component';

describe('ContactDetailsComponent', () => {
  let component: ProcessContactDetailsComponent;
  let fixture: ComponentFixture<ProcessContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessContactDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
