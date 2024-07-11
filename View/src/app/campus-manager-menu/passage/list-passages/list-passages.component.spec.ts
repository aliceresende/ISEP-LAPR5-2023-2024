import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassagesComponent } from './list-passages.component';
import { PassageService } from '../passage.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListPassagesComponent', () => {
  let component: ListPassagesComponent;
  let fixture: ComponentFixture<ListPassagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPassagesComponent],
      imports:[HttpClientModule],
      providers:[PassageService]
    });
    fixture = TestBed.createComponent(ListPassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
