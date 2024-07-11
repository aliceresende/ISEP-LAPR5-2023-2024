import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { EditElevatorComponent } from './edit-elevator.component';
import { ElevatorService } from '../elevator.service';
import { BuildingService } from '../../building/building.service';
import { FloorService } from '../../floor/floor.service';

describe('EditElevatorComponent', () => {
  let component: EditElevatorComponent;
  let fixture: ComponentFixture<EditElevatorComponent>;
  let elevatorService: ElevatorService;
  let buildingService: BuildingService;
  let floorService: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [EditElevatorComponent],
      providers: [ElevatorService, BuildingService, FloorService]
    });
    fixture = TestBed.createComponent(EditElevatorComponent);
    component = fixture.componentInstance;
    elevatorService = TestBed.inject(ElevatorService);
    buildingService = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update elevator successfully', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        elevatorBuilding: 'Building A',
        elevatorFloors: ['Floor 1', 'Floor 2'],
        elevatorBrand: 'Brand X',
        elevatorModel: 'Model Y',
        elevatorSeriesNumber: '123',
        elevatorDescription: 'Description',
        elevatorX: '10',
        elevatorY: '20',
        elevatorLocation: 'Location'
      }
    } as NgForm;

    spyOn(elevatorService, 'update').and.returnValue(of({ message: 'Elevator updated successfully' }));

    component.updateElevator(formData);
    tick(); // For handling asynchronous code

    expect(elevatorService.update).toHaveBeenCalledWith(
      '1',
      'Building A',
      ['Floor 1', 'Floor 2'],
      'Brand X',
      'Model Y',
      '123',
      'Description',
      '10',
      '20',
      'Location'
    );
  }));

  it('should handle error while updating elevator', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        elevatorBuilding: 'Building A',
        elevatorFloors: ['Floor 1', 'Floor 2'],
        elevatorBrand: 'Brand X',
        elevatorModel: 'Model Y',
        elevatorSeriesNumber: '123',
        elevatorDescription: 'Description',
        elevatorX: '10',
        elevatorY: '20',
        elevatorLocation: 'Location'
        // Provide test data
      }
    } as NgForm;
  
    spyOn(elevatorService, 'update').and.returnValue(throwError('Error updating elevator'));
    spyOn(console, 'error');
  
    component.updateElevator(formData);
    tick(); // For handling asynchronous code
  
    expect(elevatorService.update).toHaveBeenCalledWith(
      '1',
      'Building A',
      ['Floor 1', 'Floor 2'],
      'Brand X',
      'Model Y',
      '123',
      'Description',
      '10',
      '20',
      'Location'
    );
    expect(console.error).toHaveBeenCalledWith('Error updating elevator:', 'Error updating elevator');
    // Add additional expectations for error handling in your component
  }));
  
});
