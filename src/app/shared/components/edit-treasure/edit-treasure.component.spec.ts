import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreasureComponent } from './edit-treasure.component';

describe('EditTreasureComponent', () => {
  let component: EditTreasureComponent;
  let fixture: ComponentFixture<EditTreasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTreasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
