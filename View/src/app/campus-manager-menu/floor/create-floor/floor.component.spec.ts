import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FloorComponent } from './floor.component';
import { FloorService } from '../floor.service';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { of, throwError } from 'rxjs';

describe('FloorComponent', () => {
  let component: FloorComponent;
  let fixture: ComponentFixture<FloorComponent>;
  let floorService: FloorService;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [FloorComponent],
      providers: [FloorService, BuildingService] // Provide necessary services
    }).compileComponents();

    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create floor and handle success', fakeAsync(() => {
    const mockForm = {
      value: {
        floorNumber: '1',
        description: 'Building C - Floor 1',
        floorBuilding: '1'
      }
    };
    spyOn(floorService, 'createFloor').and.returnValue(of({ message: 'Floor created successfully' }));

    component.createFloor(mockForm as any);
    tick();

    expect(floorService.createFloor).toHaveBeenCalledWith('1', 'Building C - Floor 1', '1');
  }));

  it('should handle error during floor creation', fakeAsync(() => {
    const mockForm = {
      value: {
        floorNumber: '1',
        description: 'Building C - Floor 1',
        floorBuilding: '1'
      }
    };
    
    spyOn(floorService, 'createFloor').and.returnValue(
      throwError(new Error('Failed to create floor'))
    );
  
    component.createFloor(mockForm as any);
    tick();
  
    expect(floorService.createFloor).toHaveBeenCalledWith('1', 'Building C - Floor 1', '1');
  }));
  
  
});
