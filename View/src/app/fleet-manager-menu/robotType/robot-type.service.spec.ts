import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotTypeService } from './robot-type.service';

describe('RobotTypeService', () => {
  let service: RobotTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RobotTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the API URL', () => {
    expect(service.getApiUrl()).toBe('http://localhost:3000/api/robotTypes');
  });

  it('should create a robot type', () => {
    const mockRobotTypeData = {
      robotType: 'Type A',
      brand: 'Brand X',
      model: 'Model Y',
      typeOfTasks: ['Task 1', 'Task 2']
    };

    service.create(
      mockRobotTypeData.robotType,
      mockRobotTypeData.brand,
      mockRobotTypeData.model,
      mockRobotTypeData.typeOfTasks
    ).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robotTypes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRobotTypeData);
    req.flush({});
  });
});
