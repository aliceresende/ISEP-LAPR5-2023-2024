import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.css']
})
export class PrivacyPolicyModalComponent {
  constructor(public dialogRef: MatDialogRef<PrivacyPolicyModalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
