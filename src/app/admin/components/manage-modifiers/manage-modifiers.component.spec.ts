import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModifiersComponent } from './manage-modifiers.component';

describe('ManageModifiersComponent', () => {
  let component: ManageModifiersComponent;
  let fixture: ComponentFixture<ManageModifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
