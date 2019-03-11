import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleValuablesComponent } from './manage-rule-valuables.component';

describe('ManageRuleValuablesComponent', () => {
  let component: ManageRuleValuablesComponent;
  let fixture: ComponentFixture<ManageRuleValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRuleValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRuleValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
