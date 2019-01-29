import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTreasureComponent } from './display-treasure.component';

describe('DisplayTreasureComponent', () => {
  let component: DisplayTreasureComponent;
  let fixture: ComponentFixture<DisplayTreasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTreasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
