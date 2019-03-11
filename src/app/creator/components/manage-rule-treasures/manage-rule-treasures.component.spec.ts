import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleTreasuresComponent } from './manage-rule-treasures.component';

describe('ManageRuleTreasuresComponent', () => {
  let component: ManageRuleTreasuresComponent;
  let fixture: ComponentFixture<ManageRuleTreasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRuleTreasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRuleTreasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
