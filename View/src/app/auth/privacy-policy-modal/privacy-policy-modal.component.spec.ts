import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicyModalComponent } from './privacy-policy-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('PrivacyPolicyModalComponent', () => {
  let component: PrivacyPolicyModalComponent;
  let fixture: ComponentFixture<PrivacyPolicyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyModalComponent],
      imports: [HttpClientModule, MatDialogModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} } // Mock MatDialogRef
        // Other providers, if necessary
      ]
    });
    fixture = TestBed.createComponent(PrivacyPolicyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
