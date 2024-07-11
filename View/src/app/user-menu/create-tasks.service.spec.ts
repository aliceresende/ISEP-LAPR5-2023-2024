import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreateTasksService } from './create-tasks.service';
import { PickUpDelivery } from './pickUpDelivery';
import { Vigilance } from './vigilance';

describe('CreateTasksService', () => {
  let service: CreateTasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CreateTasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a post request to create a vigilance task', () => {
    const mockVigilance: Vigilance = {
        userId: 'user123',
        message: 'Security patrol required',
        phoneNumber: 1234567890,
        startingPoint: 'room1',
        endingPoint: 'room2',
        robotAssignedTo: 'robot1'
    };

    service.createVigilanceRequests(mockVigilance).subscribe(response => {
      expect(response).toEqual(mockVigilance);
    });

    const req = httpMock.expectOne('http://localhost:5057/api/Vigilance');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockVigilance);
    req.flush(mockVigilance);
  });

  it('should send a post request to create a pickup and delivery task', () => {
    const mockPickUpDelivery: PickUpDelivery = {
      userId: 'user123',
      roomPick: 'Room 123',
    roomDeliver: 'Room 321',
    namePick: 'Name1',
    nameDeliver: 'Name2',
    phoneNumberPick: 987654321,
    phoneNumberDeliver: 987654321,
    code:123,
    robotAssignedTo: 'BOB'

    };

    service.createPUDRequests(mockPickUpDelivery).subscribe(response => {
      expect(response).toEqual(mockPickUpDelivery);
    });

    const req = httpMock.expectOne('http://localhost:5057/api/PickUpDeliver');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPickUpDelivery);
    req.flush(mockPickUpDelivery);
  });

  // Additional tests can be added as needed
});
