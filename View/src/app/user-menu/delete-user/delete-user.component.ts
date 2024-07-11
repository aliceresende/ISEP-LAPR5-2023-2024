import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  email: string =  this.authService.getLoggedInUser().email ;//this.authService.getLoggedInUserEmail()!;

 
   constructor(private authService: AuthService, private userService: UserService,private router: Router) { 
   }
 
   @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() deleteCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
 
   showConfirmation: boolean = false;
 
   openConfirmation() {
     this.showConfirmation = true;
   }
 
   // DeleteUserComponent
confirmDelete() {
  console.log('Confirmar exclusão chamado');
  // Chamada para excluir a conta
  this.userService.deleteUser(this.email).subscribe(
    () => {
      // Emite evento informando que a exclusão foi confirmada
      this.deleteConfirmed.emit(true);
      // Fecha o pop-up
      this.showConfirmation = false;
      this.authService.logout();
      this.router.navigate(['/auth/signup']);
    },
    (error) => {
      // Trate o erro aqui, se necessário
      console.error('Erro ao excluir usuário:', error);
    }
  );
}
 
   cancelDelete() {
     // Emite evento informando que a exclusão foi cancelada
     this.deleteCanceled.emit(true);
 
     // Fecha o pop-up
     this.showConfirmation = false;
     this.router.navigate(['/user']);
   }
}
