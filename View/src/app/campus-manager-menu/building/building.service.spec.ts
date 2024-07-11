import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BuildingService } from './building.service';
import { Building } from './building';

describe('BuildingService', () => {
  let service: BuildingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService]
    });
    service = TestBed.inject(BuildingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return API URL', () => {
    const apiUrl = service.getApiUrl();
    expect(apiUrl).toEqual('http://localhost:3000/api/buildings');
  });

  it('should create a building', () => {
    const mockBuilding: Building = {
      id: '1',
      name: 'Building A',
      code: 'ABC123',
      description: 'Description',
      x: 10,
      y: 20
    };

    service.createBuilding(mockBuilding).subscribe(building => {
      expect(building).toEqual(mockBuilding);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/buildings');
    expect(req.request.method).toBe('POST');
    req.flush(mockBuilding);
  });

  it('should clear items array', () => {
    service.items = [{ id: '1', name: 'Building A', code: 'ABC123', description: '', x: 0, y: 0 }];
    service.clearForm();
    expect(service.items.length).toBe(0);
  });

  it('should retrieve buildings list', () => {
    const mockBuildings = [
      { id: '1', name: 'Building A', code: 'ABC123', description: '', x: 0, y: 0 },
      { id: '2', name: 'Building B', code: 'DEF456', description: '', x: 0, y: 0 }
    ];

    service.getBuildingsList().subscribe(buildings => {
      expect(buildings).toEqual(mockBuildings);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/buildings/listBuildings');
    expect(req.request.method).toBe('GET');
    req.flush(mockBuildings);
  });

  it('should update a building', () => {
    const mockUpdatedBuilding: Building = {
      id: '1',
      name: 'Building A',
      code: 'ABC123',
      description: 'Updated Description',
      x: 10,
      y: 20
    };

    service.updateBuilding('1', 'Building A', 'ABC123', 'Updated Description', 10, 20).subscribe(building => {
      expect(building).toEqual(mockUpdatedBuilding);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/buildings');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockUpdatedBuilding);
  });
});
