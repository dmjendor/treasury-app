import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRuleEditionComponent } from './edit-rule-edition.component';

describe('EditRuleEditionComponent', () => {
  let component: EditRuleEditionComponent;
  let fixture: ComponentFixture<EditRuleEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRuleEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRuleEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
