import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightRouteComponent } from './flight-route.component';

describe('FlightRootComponent', () => {
  let component: FlightRouteComponent;
  let fixture: ComponentFixture<FlightRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
