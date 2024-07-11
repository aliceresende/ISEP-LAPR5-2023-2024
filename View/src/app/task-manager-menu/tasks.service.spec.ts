import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PickUpDelivery } from '../user-menu/pickUpDelivery';
import { HttpClientModule } from '@angular/common/http';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve PUD tasks by email', () => {
    const mockEmail = 'test@example.com';
    const mockResponse: PickUpDelivery[] = [{ userId: 'user123',
    roomPick: 'Room 123',
  roomDeliver: 'Room 321',
  namePick: 'Name1',
  nameDeliver: 'Name2',
  phoneNumberPick: 987654321,
  phoneNumberDeliver: 987654321,
  code:123,
  robotAssignedTo: 'BOB'}];
  
    service.getPUDTaskByEmail(mockEmail).subscribe(tasks => {
      expect(tasks).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`http://localhost:5057/api/PickUpDeliver/user/${mockEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  

  it('should send a patch request to approve or refuse PUD task', () => {
    const mockRequestId = '123';
    const mockStatus = true;
    const mockRobotId = 'robot1';
  
    service.approveOrRefusePickUpDelivery(mockRequestId, mockStatus, mockRobotId).subscribe();
  
    const req = httpMock.expectOne(`http://localhost:5057/api/PickUpDeliver/${mockRequestId}/true/${mockRobotId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({}); // Mock empty response
  });
  
  
});
