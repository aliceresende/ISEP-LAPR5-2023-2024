import { Component } from '@angular/core';
import { UserDTO } from 'src/app/auth/user';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-activate-users',
  templateUrl: './activate-users.component.html',
  styleUrls: ['./activate-users.component.css']
})
export class ActivateUsersComponent {
  usersList: UserDTO[] = [];

  constructor(
    private adminService: AdminService,
  ) { }

  acceptUser(email: string) {
    this.adminService.acceptUser(email).subscribe(
      () => {
        // Atualizar a lista de usuários após aceitar
        this.loadUsersList();
      },
      error => {
        console.error('Erro ao aceitar usuário:', error);
      }
    );
  }

  denyUser(email: string) {
    this.adminService.denyUser(email).subscribe(
      () => {
        // Atualizar a lista de usuários após negar
        this.loadUsersList();
      },
      error => {
        console.error('Erro ao negar usuário:', error);
      }
    );
  }

  private loadUsersList() {
    // Chame seu serviço para obter a lista atualizada de usuários
    this.adminService.getWaitingUsers().subscribe(
      usersList => {
        this.usersList = usersList;
      },
      error => {
        console.error('Erro ao obter a lista de usuários:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadUsersList();
  }

}
