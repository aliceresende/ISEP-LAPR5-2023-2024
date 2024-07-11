import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPolicyModalComponent } from '../privacy-policy-modal/privacy-policy-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string='';
  lastName:string='';
  email:string='';
  password:string='';
  phone: string = '';
  taxPayerNumber: string = '';
  status:boolean=false;
  roles = new Array<any>();
  privacyPolicy: boolean = false;
  
  ngOnInit() {
    this.getRoles();
  }
  
  getRoles() {
    this.authService.getRolesList().subscribe((data) => {
      this.roles = data;
    });
  }
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  

  openPrivacyPolicy(): void {
    this.dialog.open(PrivacyPolicyModalComponent, {
      width: '800px',
      height: '600px',
    });
  }
  createUser(formData: any) {

    if (!this.privacyPolicy) {
      return;
  }
    const userData = {
      firstName: formData.value.firstName,
      lastName:formData.value.lastName,
      email:formData.value.email,
      password:formData.value.password,
      phone: formData.value.phone,
      taxPayerNumber: formData.value.taxPayerNumber,
    };
    console.log('User Data:', userData);

    this.authService.signupUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.phone,
      userData.taxPayerNumber,
    ).subscribe(response => {
      console.log('User created:', response);
    }, error => {
      console.error('Error creating user:', error);
    });
  }

}
