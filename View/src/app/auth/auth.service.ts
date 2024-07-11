import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlSignUp = 'http://localhost:3000/api/auth/signup'; // Replace with your actual API URL
  //private apiUrlSignIn = 'https://robdronego63.azurewebsites.net/api/auth/signin'; // Replace with your actual API URL
  private apiUrlSignIn = 'http://localhost:3000/api/auth/signin';

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return this.apiUrlSignUp;
  }

  signupUser(firstName: string, lastName: string, email: string, password:string, phone:number, taxPayerNumber:number){
    const userData = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      phone:phone,
      taxPayerNumber:taxPayerNumber
    };
    console.log("USER DATA:",userData);
    return this.http.post(this.apiUrlSignUp, userData);
  }

  login(email:string, password: string) {
    const userData = {
      email:email,
      password:password
      
    };
    return this.http.post<any>(this.apiUrlSignIn, userData).pipe(map(response => {    
        localStorage.setItem('authToken', response.token);       
        return response;    
      }));    
  }    

  getRolesList(){
    const url='http://localhost:3000/api/roles/listRoles';
    return this.http.get<any>(url);
    
  }
// AuthService
hasRole(role: string): boolean {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    const userRole = this.decodeUserRole(storedToken);
    console.log("user service:");
    console.log(role)
    console.log(userRole);
    console.log(userRole === role)
    return userRole === role;
  }
  return false;
}

private decodeUserRole(token: string): string {
  const decodedToken = this.decodeToken(token);
  return decodedToken.role;
}

private decodeToken(token: string): any {
  const tokenPayload = token.split('.')[1];
  return JSON.parse(atob(tokenPayload));
}
getLoggedInUserEmail(): string | null {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    const decodedToken = this.decodeToken(storedToken);
    return decodedToken.email; // Assuming the token contains the email
  }
  return null;
}
getLoggedInUser(): any | null {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    const decodedToken = this.decodeToken(storedToken);
    console.log(decodedToken)
    return decodedToken; 
  }
  return null;
}

logout() { 
  localStorage.removeItem('token');
}

}
