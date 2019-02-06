import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPrepTreasureComponent } from './display-prep-treasure.component';

describe('DisplayPrepTreasureComponent', () => {
  let component: DisplayPrepTreasureComponent;
  let fixture: ComponentFixture<DisplayPrepTreasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPrepTreasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPrepTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
