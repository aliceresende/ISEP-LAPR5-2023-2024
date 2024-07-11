import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(formData: any) {
    const userData = {
      email: formData.value.email,
      password: formData.value.password,
    };

    console.log('User Data:', userData);

    this.authService.login(userData.email, userData.password).subscribe(
      (response) => {
        const token = response.token;
        console.log(token);
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userRole = decodedPayload?.role;
        
        console.log(userRole);
        if (userRole) {
          switch (userRole) {
            case 'Campus Manager':
              console.log("here");
              this.router.navigate(['/campus-menu']);
              break;
            case 'Fleet Manager':
              this.router.navigate(['/fleet-menu']);
              break;
            case 'Tasks Manager':
              this.router.navigate(['/task-menu']);
              break;
            case 'Admin':
                this.router.navigate(['/admin']);
              break;
            case 'User':
                  this.router.navigate(['/user-menu']);
                break;
            default:
              this.router.navigate(['/']);
              break;
          }
        } else {
          console.error('Invalid user response:', response);
          // Redirect or handle the error accordingly
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
