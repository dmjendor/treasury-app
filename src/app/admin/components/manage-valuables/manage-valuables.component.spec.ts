import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageValuablesComponent } from './manage-valuables.component';

describe('ManageValuablesComponent', () => {
  let component: ManageValuablesComponent;
  let fixture: ComponentFixture<ManageValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
