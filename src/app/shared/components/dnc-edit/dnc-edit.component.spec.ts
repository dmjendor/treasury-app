import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnCEditComponent } from './dnc-edit.component';

describe('DnCEditComponent', () => {
  let component: DnCEditComponent;
  let fixture: ComponentFixture<DnCEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnCEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnCEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
