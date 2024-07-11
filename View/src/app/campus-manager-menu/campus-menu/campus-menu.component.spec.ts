import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusMenuComponent } from './campus-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/auth.service';

describe('CampusMenuComponent', () => {
  let component: CampusMenuComponent;
  let fixture: ComponentFixture<CampusMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusMenuComponent],
      imports:[RouterTestingModule],
      providers:[AuthService]
    });
    fixture = TestBed.createComponent(CampusMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
