import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreasureItemComponent } from './edit-treasure-item.component';

describe('EditTreasureItemComponent', () => {
  let component: EditTreasureItemComponent;
  let fixture: ComponentFixture<EditTreasureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTreasureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTreasureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
