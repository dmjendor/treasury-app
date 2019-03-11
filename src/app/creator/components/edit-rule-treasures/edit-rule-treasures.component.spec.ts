import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRuleTreasuresComponent } from './edit-rule-treasures.component';

describe('EditRuleTreasuresComponent', () => {
  let component: EditRuleTreasuresComponent;
  let fixture: ComponentFixture<EditRuleTreasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRuleTreasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRuleTreasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
