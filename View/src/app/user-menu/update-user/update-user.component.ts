import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  email: string =  this.authService.getLoggedInUser().email ;//this.authService.getLoggedInUserEmail()!;
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  phone: string = '';

  constructor(private authService: AuthService, private userService: UserService,private router: Router) { 
  }

  updateUser(){
    const updatedUser = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      phone: this.phone
    };

    console.log()

    // Chame o serviço de usuário para realizar a atualização
    this.userService.updateUser(updatedUser.email,updatedUser.firstName,updatedUser.lastName,updatedUser.password,updatedUser.phone).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso!', response);
        // Redirecione ou tome a ação apropriada após a atualização
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
        // Lide com o erro de alguma forma, exiba uma mensagem para o usuário, etc.
      }
    );
  }
  }

