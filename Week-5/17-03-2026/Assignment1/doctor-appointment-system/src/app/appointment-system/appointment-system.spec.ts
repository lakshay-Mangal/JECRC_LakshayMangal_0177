import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSystem } from './appointment-system';

describe('AppointmentSystem', () => {
  let component: AppointmentSystem;
  let fixture: ComponentFixture<AppointmentSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSystem],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentSystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
