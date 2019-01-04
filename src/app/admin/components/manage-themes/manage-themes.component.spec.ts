import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageThemesComponent } from './manage-themes.component';

describe('ManageThemesComponent', () => {
  let component: ManageThemesComponent;
  let fixture: ComponentFixture<ManageThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
