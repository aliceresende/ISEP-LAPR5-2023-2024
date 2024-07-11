import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient ) {}

  apiUrl = 'http://localhost:3000/api/users';

  // UserService
deleteUser(email: string): Observable<any> {
  console.log("service delete user:",email);
  return this.http.patch(`${this.apiUrl}/delete/${email}`,'').pipe(
    catchError((error: any) => {
      // Trate o erro aqui, por exemplo, log ou notifique a interface do usuário.
      console.error('Erro ao excluir usuário:', error);
      throw error; // Rejeita o erro para que o componente possa tratar se necessário.
    })
  );
}

updateUser(email: string,firstName: string,lastName: string,password: string,phone: string): Observable<any> {

  let userData ={
    email:email,
    firstName:firstName,
    lastName:lastName,
    password:password,
    phone:phone
  }
  const url = `${this.apiUrl}/update/${email}`; // Substitua pela rota de atualização da sua API
  return this.http.patch(url, userData);
}
}


