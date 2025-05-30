import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevicesComponent } from './admin-devices.component';

describe('AdminDevicesComponent', () => {
  let component: AdminDevicesComponent;
  let fixture: ComponentFixture<AdminDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
