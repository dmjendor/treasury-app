import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValuableItemComponent } from './edit-valuable-item.component';

describe('EditValuableItemComponent', () => {
  let component: EditValuableItemComponent;
  let fixture: ComponentFixture<EditValuableItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditValuableItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValuableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
