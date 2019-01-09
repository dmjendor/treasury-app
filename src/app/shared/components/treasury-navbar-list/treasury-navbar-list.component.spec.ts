import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryNavbarListComponent } from './treasury-navbar-list.component';

describe('TreasuryNavbarListComponent', () => {
  let component: TreasuryNavbarListComponent;
  let fixture: ComponentFixture<TreasuryNavbarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasuryNavbarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryNavbarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
