import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMonitorComponent } from './admin-monitor.component';

describe('AdminMonitorComponent', () => {
  let component: AdminMonitorComponent;
  let fixture: ComponentFixture<AdminMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
