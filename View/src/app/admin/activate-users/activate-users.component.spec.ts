import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUsersComponent } from './activate-users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';

describe('ActivateUsersComponent', () => {
  let component: ActivateUsersComponent;
  let fixture: ComponentFixture<ActivateUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateUsersComponent],
      imports:[HttpClientModule,FormsModule],
      providers:[AdminService]
    });
    fixture = TestBed.createComponent(ActivateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
