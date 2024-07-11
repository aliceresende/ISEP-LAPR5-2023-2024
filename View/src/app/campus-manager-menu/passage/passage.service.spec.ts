import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PassageService } from './passage.service';
/*
describe('PassageService', () => {
  let service: PassageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PassageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve passage list between buildings', () => {
    const mockPassages = [{ id: '1', location: 'Passage A' }, { id: '2', location: 'Passage B' }];
    const idBuilding1 = '1';
    const idBuilding2 = '2';

    service.getPassageList(idBuilding1, idBuilding2).subscribe(passages => {
      expect(passages).toEqual(mockPassages);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/${idBuilding1}/${idBuilding2}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPassages);
  });

  it('should create a passage', () => {
    const floorBuilding1 = '1';
    const floorBuilding2 = '2';
    const location = 'Passage C';

    service.createPassage(floorBuilding1, floorBuilding2, location).subscribe();

    const req = httpMock.expectOne(service.getApiUrl());
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ floorBuilding1, floorBuilding2, location });
    req.flush({});
  });

  it('should update a passage', () => {
    const passageId = '1';
    const floorBuilding1 = '1';
    const floorBuilding2 = '2';
    const location = 'Updated Passage';

    service.updatePassage(passageId, floorBuilding1, floorBuilding2, location).subscribe();

    const req = httpMock.expectOne(`${service.getApiUrl()}/${passageId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ floorBuilding1, floorBuilding2, location });
    req.flush({});
  });
});*/
