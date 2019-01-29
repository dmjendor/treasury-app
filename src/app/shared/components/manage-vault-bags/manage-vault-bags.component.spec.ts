import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVaultBagsComponent } from './manage-vault-bags.component';

describe('ManageVaultBagsComponent', () => {
  let component: ManageVaultBagsComponent;
  let fixture: ComponentFixture<ManageVaultBagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVaultBagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVaultBagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
