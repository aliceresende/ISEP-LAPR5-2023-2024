import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManagersComponent } from './create-managers.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';

describe('CreateManagersComponent', () => {
  let component: CreateManagersComponent;
  let fixture: ComponentFixture<CreateManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateManagersComponent],
      imports:[HttpClientModule, FormsModule],
      providers:[AdminService]
    });
    fixture = TestBed.createComponent(CreateManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
