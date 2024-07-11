import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';

describe('ElevatorService', () => {
  let service: ElevatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ElevatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should get the API URL', () => {
    expect(service.getApiUrl()).toBe('http://localhost:3000/api/elevators');
  });

  it('should create an elevator', () => {
    const mockElevatorData = {
      building: 'Building A',
      floors: ['1', '2', '3'],
      brand: 'Brand X',
      model: 'Model Y',
      seriesNumber: '123',
      description: 'Elevator description',
      x: '10',
      y: '20',
      location: 'Location A'
    };

    service.create(
      mockElevatorData.building,
      mockElevatorData.floors,
      mockElevatorData.brand,
      mockElevatorData.model,
      mockElevatorData.seriesNumber,
      mockElevatorData.description,
      mockElevatorData.x,
      mockElevatorData.y,
      mockElevatorData.location
    ).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/elevators');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockElevatorData);
    req.flush({});
  });

  it('should update an elevator', () => {
    const mockElevatorData = {
      id: '1',
      building: 'Building B',
      floors: ['4', '5'],
      brand: 'Brand Z',
      model: 'Model A',
      seriesNumber: '456',
      description: 'Updated elevator description',
      x: '30',
      y: '40',
      location: 'Location B'
    };

    service.update(
      mockElevatorData.id,
      mockElevatorData.building,
      mockElevatorData.floors,
      mockElevatorData.brand,
      mockElevatorData.model,
      mockElevatorData.seriesNumber,
      mockElevatorData.description,
      mockElevatorData.x,
      mockElevatorData.y,
      mockElevatorData.location
    ).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/elevators');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockElevatorData);
    req.flush({});
  });

  it('should get all elevators', () => {
    service.getAllElevators().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/elevators/allElevators');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get elevators by building ID', () => {
    const buildingId = '123';

    service.getElevators(buildingId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/elevators/listElevators/${buildingId}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });*/
});
