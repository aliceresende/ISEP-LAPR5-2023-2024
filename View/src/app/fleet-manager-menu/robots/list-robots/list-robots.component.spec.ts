import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRobotsComponent } from './list-robots.component';
import { RobotService } from '../robot.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListRobotsComponent', () => {
  let component: ListRobotsComponent;
  let fixture: ComponentFixture<ListRobotsComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRobotsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule], 
      providers: [RobotService] 
    }).compileComponents();

    fixture = TestBed.createComponent(ListRobotsComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get robots on init', () => {
    const mockRobots = [
      { id: 1, code: 'ABCD', nickname: 'Robot1', description: 'Description1' },
      { id: 2, code: 'EFGH', nickname: 'Robot2', description: 'Description2' }
    ];

    spyOn(robotService, 'getRobotsList').and.returnValue(of(mockRobots));

    component.ngOnInit();

    expect(component.robots.length).toBe(2);
    // Add more expectations as needed
  });

 
});
