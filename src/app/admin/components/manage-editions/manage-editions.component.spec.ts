import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditionsComponent } from './manage-editions.component';

describe('ManageEditionsComponent', () => {
  let component: ManageEditionsComponent;
  let fixture: ComponentFixture<ManageEditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
