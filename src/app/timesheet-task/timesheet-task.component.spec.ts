import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetTaskComponent } from './timesheet-task.component';

describe('TimesheetTaskComponent', () => {
  let component: TimesheetTaskComponent;
  let fixture: ComponentFixture<TimesheetTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
