import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserDTO } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your actual API URL
  //private apiUrlSignIn = 'https://robdronego63.azurewebsites.net/api/auth/signin'; // Replace with your actual API URL
  private apiUrlSignIn = 'http://localhost:3000/api/auth/signin';

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return this.apiUrl+'/signup';
  }

  createManager(firstName: string, lastName: string, email: string, password:string, role:string, phone:number){
    const userData = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      role:role,
      phone:phone
    };
    console.log("Manager DATA:",userData);
    return this.http.post(this.apiUrl+'/user-create', userData);
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

  getUsersList(){
    const url='http://localhost:3000/api/users/listUsers';
    return this.http.get<UserDTO[]>(url); 
  }

  getWaitingUsers(){
    const url='http://localhost:3000/api/users/listWaitingUsers';
    return this.http.get<UserDTO[]>(url); 
  }

  acceptUser(email: string) {
    const url='http://localhost:3000/api/users/activateUser/'+email;
    return this.http.patch(url,'');
  }

  denyUser(email: string) {
    const url='http://localhost:3000/api/users/deactivateUser/'+email;
    return this.http.patch(url,'');
  }
}

