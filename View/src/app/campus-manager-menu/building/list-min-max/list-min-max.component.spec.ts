import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMinMaxComponent } from './list-min-max.component';
import { FloorService } from '../../floor/floor.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ListMinMaxComponent', () => {
  let component: ListMinMaxComponent;
  let fixture: ComponentFixture<ListMinMaxComponent>;
  let floorService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, FormsModule],
      declarations: [ListMinMaxComponent],
      providers: [FloorService]
    });
    fixture = TestBed.createComponent(ListMinMaxComponent);
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMinMaxFloorBuildings and update buildings array', () => {
    const mockBuildings = [
      { id: 1, name: 'Building A' },
      { id: 2, name: 'Building B' }
      // Mock your buildings array data as needed
    ];

    spyOn(floorService, 'getMinMaxFloorBuildings').and.returnValue(of(mockBuildings));

    component.getMinMaxFloorBuildings('1', '3');

    expect(floorService.getMinMaxFloorBuildings).toHaveBeenCalledWith('1', '3');
  });


  
});
