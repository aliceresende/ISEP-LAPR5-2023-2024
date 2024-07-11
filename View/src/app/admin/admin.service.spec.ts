import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { UserDTO } from '../auth/user';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a post request to create a manager', () => {
    const mockManagerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'manager',
      phone: 1234567890
    };
  
    service.createManager(
      mockManagerData.firstName,
      mockManagerData.lastName,
      mockManagerData.email,
      mockManagerData.password,
      mockManagerData.role,
      mockManagerData.phone
    ).subscribe();
  
    const req = httpMock.expectOne('http://localhost:3000/api/auth/user-create');
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(mockManagerData);
  req.flush({}); // Mock empty response
  });


  it('should retrieve users list', () => {

    const mockUsers: UserDTO[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'User',
        phone: 1234567890,
        state: 'Active',
        taxPayerNumber: 123456789
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: 'Admin',
        phone: 1234567891,
        state: 'Inactive',
        taxPayerNumber: 987654321
      }
    ];
    
    service.getUsersList().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/api/users/listUsers');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
});
