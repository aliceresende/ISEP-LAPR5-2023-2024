import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CreateBuildingComponent } from './create-building.component';
import { BuildingService } from '../building.service';
import { of, throwError } from 'rxjs';
import { Building } from '../building';

describe('CreateBuildingComponent', () => {
  let component: CreateBuildingComponent;
  let fixture: ComponentFixture<CreateBuildingComponent>;
  let buildingServiceSpy: jasmine.SpyObj<BuildingService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    buildingServiceSpy = jasmine.createSpyObj('BuildingService', ['createBuilding']);
    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      declarations: [CreateBuildingComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BuildingService, useValue: buildingServiceSpy },
        { provide: FormBuilder, useValue: formBuilder }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.checkoutForm.get('name')?.value).toEqual(''); // Use safe navigation operator (?)
    expect(component.checkoutForm.get('code')?.value).toEqual('');
    // Add assertions for other form fields
  });
  it('should call add method when button is clicked', () => {
    const addSpy = spyOn(component, 'add');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(addSpy).toHaveBeenCalled();
  });


  
});
