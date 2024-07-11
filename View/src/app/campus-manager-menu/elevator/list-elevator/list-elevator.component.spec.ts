import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ListElevatorComponent } from './list-elevator.component';
import { ElevatorService } from '../elevator.service';
import { BuildingService } from '../../building/building.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ListElevatorComponent', () => {
  let component: ListElevatorComponent;
  let fixture: ComponentFixture<ListElevatorComponent>;
  let elevatorService: ElevatorService;
  let buildingService: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListElevatorComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [ElevatorService, BuildingService],
    });

    fixture = TestBed.createComponent(ListElevatorComponent);
    component = fixture.componentInstance;
    elevatorService = TestBed.inject(ElevatorService);
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should get elevators based on building ID', () => {
    const buildingID = '123';
    const mockElevators = [
      { building: '123', floors: ['1', '2'], brand: 'Brand1', model: 'Model1', seriesNumber: 'S123', description: 'Description1', x: 'X123', y: 'Y123', location: 'Location1' },
      { building: '123', floors: ['3', '4'], brand: 'Brand2', model: 'Model2', seriesNumber: 'S456', description: 'Description2', x: 'X456', y: 'Y456', location: 'Location2' }
    ];

    spyOn(buildingService, 'getBuildingsList').and.returnValue(of([{ id: '123', name: 'Building 123' }]));
    spyOn(elevatorService, 'getElevators').and.returnValue(of(mockElevators));

    component.buildingID = buildingID;
    component.getElevators(buildingID);

    expect(elevatorService.getElevators).toHaveBeenCalledWith(buildingID);
    expect(component.elevatorsList).toEqual(mockElevators);
  });


});
