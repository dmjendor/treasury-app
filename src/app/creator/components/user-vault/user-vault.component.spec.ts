import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVaultComponent } from './user-vault.component';

describe('UserVaultComponent', () => {
  let component: UserVaultComponent;
  let fixture: ComponentFixture<UserVaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
