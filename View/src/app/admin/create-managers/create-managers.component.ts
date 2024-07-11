import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-managers',
  templateUrl: './create-managers.component.html',
  styleUrls: ['./create-managers.component.css']
})
export class CreateManagersComponent {
  firstName: string='';
  lastName:string='';
  email:string='';
  password:string='';
  role: string='';
  phone: string = '';
  status:boolean=false;

  roles = new Array<any>();
  
  ngOnInit() {
    this.getRoles();
  }
  
  getRoles() {
    this.authService.getRolesList().subscribe((data) => {
      this.roles = data;
    });
  }
  constructor(private authService: AuthService, private adminService: AdminService) {}
  
  createManager(formData: any) {
    // You can access the form data directly from the formData parameter
    const userData = {
      firstName: formData.value.firstName,
      lastName:formData.value.lastName,
      email:formData.value.email,
      password:formData.value.password,
      role:formData.value.role,
      phone: formData.value.phone
    };
    console.log('User Data:', userData);

    this.adminService.createManager(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.role,
      userData.phone,
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('User created:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error creating user:', error);
    });
  }
}
