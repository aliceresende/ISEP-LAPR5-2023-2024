import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';

describe('FloorService', () => {
  let service: FloorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService]
    });

    service = TestBed.inject(FloorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve floors list', () => {
    const mockFloors = [{ id: '1', floorNumber: '1', description: 'Floor 1' }, { id: '2', floorNumber: '2', description: 'Floor 2' }];
    service.getFloorsList().subscribe(floors => {
      expect(floors).toEqual(mockFloors);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/listFloors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFloors);
  });

  it('should retrieve floors list by building ID', () => {
    const buildingId = '1';
    const mockFloorsByBuilding = [{ id: '1', floorNumber: '1', description: 'Floor 1' }, { id: '2', floorNumber: '2', description: 'Floor 2' }];
    service.getFloorsByBuilding(buildingId).subscribe(floors => {
      expect(floors).toEqual(mockFloorsByBuilding);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/listFloors/${buildingId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFloorsByBuilding);
  });

  it('should create a floor', () => {
    const mockFloorNumber = '1';
    const mockDescription = 'Floor 1';
    const mockFloorBuilding = '1';
    const mockResponse = { id: '1', floorNumber: mockFloorNumber, description: mockDescription, floorBuilding: mockFloorBuilding };
    
    service.createFloor(mockFloorNumber, mockDescription, mockFloorBuilding).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.getApiUrl());
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a floor', () => {
    const mockId = '1';
    const mockFloorNumber = '2';
    const mockDescription = 'Updated Floor 2';
    const mockResponse = { id: mockId, floorNumber: mockFloorNumber, description: mockDescription };
    
    service.updateFloor(mockId, mockFloorNumber, mockDescription).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.getApiUrl());
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });

  // Add more test cases as needed for other methods in FloorService
});
