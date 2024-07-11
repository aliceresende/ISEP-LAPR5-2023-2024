import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UpdateFloorComponent } from './update-floor.component';
import { FloorService } from '../floor.service';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { of, throwError } from 'rxjs';

describe('UpdateFloorComponent', () => {
  let component: UpdateFloorComponent;
  let fixture: ComponentFixture<UpdateFloorComponent>;
  let floorService: FloorService;
  let buildingService: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [UpdateFloorComponent],
      providers: [FloorService, BuildingService] // Provide necessary services
    });
    fixture = TestBed.createComponent(UpdateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve buildings list', () => {
    const buildings = [{ id: '1', name: 'Building A' }, { id: '2', name: 'Building B' }];
    spyOn(buildingService, 'getBuildingsList').and.returnValue(of(buildings));

    component.getBuildings();

    expect(buildingService.getBuildingsList).toHaveBeenCalled();
    expect(component.buildings).toEqual(buildings);
  });

  it('should retrieve floors list', () => {
    const floors = [{ id: '1', floorNumber: '1', description: 'Floor 1' }, { id: '2', floorNumber: '2', description: 'Floor 2' }];
    spyOn(floorService, 'getFloorsList').and.returnValue(of(floors));

    component.getFloors();

    expect(floorService.getFloorsList).toHaveBeenCalled();
    expect(component.floors).toEqual(floors);
  });

  it('should update floor and handle success', fakeAsync(() => {
    const mockForm = {
      value: {
        id: '1',
        floorNumber: '2',
        description: 'Updated Floor 2'
      }
    };
    spyOn(floorService, 'updateFloor').and.returnValue(of({ message: 'Floor updated successfully' }));

    component.updateFloor(mockForm as any);
    tick();

    expect(floorService.updateFloor).toHaveBeenCalledWith('1', '2', 'Updated Floor 2');
  }));

  it('should handle error during floor update', fakeAsync(() => {
    const mockForm = {
      value: {
        id: '1',
        floorNumber: '2',
        description: 'Updated Floor 2'
      }
    };
    
    spyOn(floorService, 'updateFloor').and.returnValue(
      throwError(new Error('Failed to update floor'))
    );
  
    component.updateFloor(mockForm as any);
    tick();
  
    expect(floorService.updateFloor).toHaveBeenCalledWith('1', '2', 'Updated Floor 2');
  }));
});
