import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVaultsComponent } from './manage-vaults.component';

describe('ManageVaultsComponent', () => {
  let component: ManageVaultsComponent;
  let fixture: ComponentFixture<ManageVaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
