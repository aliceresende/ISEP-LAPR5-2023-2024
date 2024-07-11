import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BuildingService } from '../building.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateBuildingComponent } from './update-building';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBuildingComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [BuildingService],
    }).compileComponents();

    buildingService = TestBed.inject(BuildingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buildingService.updateBuilding and log success message on successful update', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        name: 'Building A',
        code: 'B001',
        description: 'Description',
        x: 10,
        y: 20,
      },
    } as any;

    spyOn(buildingService, 'updateBuilding').and.returnValue(of({ message: 'Building updated successfully' }));
    spyOn(console, 'log');

    component.updateBuilding(formData);

    tick(); // Wait for asynchronous operation to complete

    expect(buildingService.updateBuilding).toHaveBeenCalledWith(
      '1',
      'Building A',
      'B001',
      'Description',
      10,
      20
    );
    expect(console.log).toHaveBeenCalledWith('Floor updated:', { message: 'Building updated successfully' });
  }));

  it('should handle error when updating a building', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        name: 'Building A',
        code: 'B001',
        description: 'Description',
        x: 10,
        y: 20,
      },
    } as any;

    spyOn(buildingService, 'updateBuilding').and.returnValue(throwError('Error updating building'));
    spyOn(console, 'error');

    component.updateBuilding(formData);

    tick(); // Wait for asynchronous operation to complete

    expect(buildingService.updateBuilding).toHaveBeenCalledWith(
      '1',
      'Building A',
      'B001',
      'Description',
      10,
      20
    );
    expect(console.error).toHaveBeenCalledWith('Error update floor:', 'Error updating building');
  }));

});
