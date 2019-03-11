import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleEditionsComponent } from './manage-rule-editions.component';

describe('ManageRuleEditionsComponent', () => {
  let component: ManageRuleEditionsComponent;
  let fixture: ComponentFixture<ManageRuleEditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRuleEditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRuleEditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
