import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreatePassagesComponent } from './create-passages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PassageService } from '../passage.service';
import { of, throwError } from 'rxjs';
/*
describe('CreatePassagesComponent', () => {
  let component: CreatePassagesComponent;
  let fixture: ComponentFixture<CreatePassagesComponent>;
  let passageService: PassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CreatePassagesComponent]
    });
    fixture = TestBed.createComponent(CreatePassagesComponent);
    component = fixture.componentInstance;
    passageService = TestBed.inject(PassageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a passage successfully', fakeAsync(() => {
    const formData = {
      value: {
        floorBuilding1: 'Building1',
        floorBuilding2: 'Building2',
        location: 'Location'
      }
    };

    spyOn(passageService, 'createPassage').and.returnValue(of({ message: 'Passage created successfully' }));

    component.createPassage(formData);

    tick(); 

    expect(passageService.createPassage).toHaveBeenCalledWith('Building1', 'Building2', 'Location');

  }));

  it('should handle error when creating a passage', fakeAsync(() => {
    const formData = {
      value: {
        floorBuilding1: 'Building1',
        floorBuilding2: 'Building2',
        location: 'Location'
      }
    };

    spyOn(passageService, 'createPassage').and.returnValue(throwError('Error creating passage'));
    spyOn(console, 'error');

    component.createPassage(formData);

    tick(); // Wait for asynchronous operation to complete

    expect(passageService.createPassage).toHaveBeenCalledWith('Building1', 'Building2', 'Location');
    expect(console.error).toHaveBeenCalledWith('Error creating passage:', 'Error creating passage');
  }));
});*/
