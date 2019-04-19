import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrepValuablesItemComponent } from './edit-prep-valuables-item.component';

describe('EditPrepValuablesItemComponent', () => {
  let component: EditPrepValuablesItemComponent;
  let fixture: ComponentFixture<EditPrepValuablesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrepValuablesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrepValuablesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
