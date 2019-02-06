import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrepTreasureComponent } from './edit-prep-treasure.component';

describe('EditPrepTreasureComponent', () => {
  let component: EditPrepTreasureComponent;
  let fixture: ComponentFixture<EditPrepTreasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrepTreasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrepTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
