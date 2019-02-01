import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTreasuresComponent } from './manage-treasures.component';

describe('ManageTreasuresComponent', () => {
  let component: ManageTreasuresComponent;
  let fixture: ComponentFixture<ManageTreasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTreasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTreasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
