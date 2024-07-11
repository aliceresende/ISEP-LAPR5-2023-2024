import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ListFloorsComponent } from './list-floors.component';
import { FloorService } from '../floor.service';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { of } from 'rxjs';
import { Floor } from '../floor';

describe('ListFloorsComponent', () => {
  let component: ListFloorsComponent;
  let fixture: ComponentFixture<ListFloorsComponent>;
  let floorService: FloorService;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ListFloorsComponent],
      providers: [FloorService, BuildingService]
    }).compileComponents();

    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get floors for a selected building', () => {
    const selectedBuildingId = '1';
    const floors = [{ id: '1', floorNumber: '1', description: 'Floor 1', floorBuilding: '1' }];
    spyOn(floorService, 'getFloorsByBuilding').and.returnValue(of(floors));

    component.getFloorsByBuilding(selectedBuildingId);

    expect(floorService.getFloorsByBuilding).toHaveBeenCalledWith(selectedBuildingId);
    expect(component.floors).toEqual(floors);
  });

  it('should retrieve buildings list', () => {
    const buildings = [{ id: '1', name: 'Building A' }, { id: '2', name: 'Building B' }];
    spyOn(buildingService, 'getBuildingsList').and.returnValue(of(buildings));
  
    component.getBuildings();
  
    expect(buildingService.getBuildingsList).toHaveBeenCalled();
    expect(component.buildings).toEqual(buildings);
  });
  



});
