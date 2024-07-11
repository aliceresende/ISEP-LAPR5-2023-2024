import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UpdatePassagesComponent } from './update-passages.component';
import { FormsModule } from '@angular/forms';
import { PassageService } from '../passage.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/*
describe('UpdatePassagesComponent', () => {
  let component: UpdatePassagesComponent;
  let fixture: ComponentFixture<UpdatePassagesComponent>;
  let passageService: PassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientTestingModule],
      declarations: [UpdatePassagesComponent],
      providers: [PassageService]
    });
    fixture = TestBed.createComponent(UpdatePassagesComponent);
    component = fixture.componentInstance;
    passageService = TestBed.inject(PassageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a passage successfully', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        floorBuilding1: 'Building1',
        floorBuilding2: 'Building2',
        location: 'Location'
      }
    };

    spyOn(passageService, 'updatePassage').and.returnValue(of({ message: 'Passage updated successfully' }));

    component.createPassage(formData);

    tick(); // Wait for asynchronous operation to complete

    expect(passageService.updatePassage).toHaveBeenCalledWith('1', 'Building1', 'Building2', 'Location');
  }));

  it('should handle error when updating a passage', fakeAsync(() => {
    const formData = {
      value: {
        id: '1',
        floorBuilding1: 'Building1',
        floorBuilding2: 'Building2',
        location: 'Location'
      }
    };

    spyOn(passageService, 'updatePassage').and.returnValue(throwError('Error updating passage'));
    spyOn(console, 'error');

    component.createPassage(formData);

    tick(); // Wait for asynchronous operation to complete

    expect(passageService.updatePassage).toHaveBeenCalledWith('1', 'Building1', 'Building2', 'Location');
    expect(console.error).toHaveBeenCalledWith('Error updating passage:', 'Error updating passage');
  }));
});*/
