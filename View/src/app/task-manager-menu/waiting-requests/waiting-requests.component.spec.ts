import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRequestsComponent } from './waiting-requests.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from '../tasks.service';

describe('WaitingRequestsComponent', () => {
  let component: WaitingRequestsComponent;
  let fixture: ComponentFixture<WaitingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingRequestsComponent],
      imports:[HttpClientModule],
      providers:[TasksService]
    });
    fixture = TestBed.createComponent(WaitingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
