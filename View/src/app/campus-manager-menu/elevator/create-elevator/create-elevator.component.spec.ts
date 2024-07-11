import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateElevatorComponent } from './create-elevator.component';
import { ElevatorService } from '../elevator.service';
import { NgForm } from '@angular/forms';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { FloorService } from 'src/app/campus-manager-menu/floor/floor.service';
import { of, throwError } from 'rxjs';

describe('CreateElevatorComponent', () => {
  let component: CreateElevatorComponent;
  let fixture: ComponentFixture<CreateElevatorComponent>;
  let elevatorService: any;
  let buildingService: any;
  let floorService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [CreateElevatorComponent],
      providers: [ElevatorService, BuildingService, FloorService]
    });

    fixture = TestBed.createComponent(CreateElevatorComponent);
    component = fixture.componentInstance;
    elevatorService = TestBed.inject(ElevatorService);
    buildingService = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call elevatorService.create when createElevator is called with valid data', () => {
    const formData = {
      value: {
        elevatorBuilding: 'Building1',
        elevatorFloors: ['Floor1', 'Floor2'],
        elevatorBrand: 'Brand1',
        elevatorModel: 'Model1',
        elevatorSeriesNumber: 'S123',
        elevatorDescription: 'Description1',
        elevatorX: 'X1',
        elevatorY: 'Y1',
        elevatorLocation: 'Location1'
      },
    } as NgForm;

    spyOn(elevatorService, 'create').and.returnValue(of({ message: 'Elevator created successfully' }));

    component.createElevator(formData);

    expect(elevatorService.create).toHaveBeenCalledWith(
      'Building1',
      ['Floor1', 'Floor2'],
      'Brand1',
      'Model1',
      'S123',
      'Description1',
      'X1',
      'Y1',
      'Location1'
    );
  });

  it('should log error when createElevator encounters an error', fakeAsync(() => {
    const formData = {
      value: {
        elevatorBuilding: 'Building 1',
        elevatorFloors: ['Floor 1', 'Floor 2'],
        elevatorBrand: 'Brand',
        elevatorModel: 'Model',
        elevatorSeriesNumber: '123',
        elevatorDescription: 'Description',
        elevatorX: '10',
        elevatorY: '20',
        elevatorLocation: 'Location'
      },
    } as NgForm;

    spyOn(elevatorService, 'create').and.returnValue(throwError('Error creating elevator'));
    spyOn(console, 'error');

    component.createElevator(formData);

    tick(); 

    expect(elevatorService.create).toHaveBeenCalledWith(
      'Building 1', ['Floor 1', 'Floor 2'], 'Brand', 'Model', '123', 'Description', '10', '20', 'Location'
    ); 
    expect(console.error).toHaveBeenCalledWith('Error creating elevator:', 'Error creating elevator');

  }));

});
