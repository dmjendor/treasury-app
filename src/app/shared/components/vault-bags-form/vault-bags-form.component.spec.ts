import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultBagsFormComponent } from './vault-bags-form.component';

describe('VaultBagsFormComponent', () => {
  let component: VaultBagsFormComponent;
  let fixture: ComponentFixture<VaultBagsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultBagsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultBagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
