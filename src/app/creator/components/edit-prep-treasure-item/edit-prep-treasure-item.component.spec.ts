import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrepTreasureItemComponent } from './edit-prep-treasure-item.component';

describe('EditPrepTreasureItemComponent', () => {
  let component: EditPrepTreasureItemComponent;
  let fixture: ComponentFixture<EditPrepTreasureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrepTreasureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrepTreasureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
