import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRuleValuablesComponent } from './edit-rule-valuables.component';

describe('EditRuleValuablesComponent', () => {
  let component: EditRuleValuablesComponent;
  let fixture: ComponentFixture<EditRuleValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRuleValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRuleValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
