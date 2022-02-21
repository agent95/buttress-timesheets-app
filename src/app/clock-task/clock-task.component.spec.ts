import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTaskComponent } from './clock-task.component';

describe('ClockTaskComponent', () => {
  let component: ClockTaskComponent;
  let fixture: ComponentFixture<ClockTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
