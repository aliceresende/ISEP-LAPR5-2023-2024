import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RobotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the API URL', () => {
    expect(service.getApiUrl()).toBe('http://localhost:3000/api/robots');
  });

  it('should get the list of robots', () => {
    service.getRobotsList().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots/listRobots');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should create a robot', () => {
    const mockRobotData = {
      code: '123',
      nickname: 'Bot',
      seriesNumber: 'ABC123',
      robotType: 'Type A',
      description: 'Description',
      status: true
    };

    service.createRobots(
      mockRobotData.code,
      mockRobotData.nickname,
      mockRobotData.seriesNumber,
      mockRobotData.robotType,
      mockRobotData.description,
      mockRobotData.status
    ).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRobotData);
    req.flush({});
  });

  it('should update a robot state', () => {
    const robotId = '123';
    service.updateRobots(robotId).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots/state');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ id: robotId });
    req.flush({});
  });

  it('should get the list of robot types', () => {
    service.getRobotsTypeList().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robotTypes/listRobots');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
