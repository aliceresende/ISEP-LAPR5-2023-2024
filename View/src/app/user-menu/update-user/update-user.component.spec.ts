import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserComponent } from './update-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(() => {

    mockAuthService = {
      getLoggedInUser: () => ({ email: 'test@example.com' })
    };
    TestBed.configureTestingModule({
      declarations: [UpdateUserComponent],
      imports:[HttpClientModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        // other providers if necessary
      ]

    });
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
