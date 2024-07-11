import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFloorComponent } from './open-floor.component';

describe('OpenFloorComponent', () => {
  let component: OpenFloorComponent;
  let fixture: ComponentFixture<OpenFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenFloorComponent]
    });
    fixture = TestBed.createComponent(OpenFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
