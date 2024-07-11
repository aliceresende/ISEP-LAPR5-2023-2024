import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUserComponent } from './delete-user.component';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(() => {
    // Create a mock AuthService with a getLoggedInUser method
    mockAuthService = {
      getLoggedInUser: () => ({ email: 'test@example.com' })
    };

    TestBed.configureTestingModule({
      declarations: [DeleteUserComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        // other providers if necessary
      ]
    });
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
