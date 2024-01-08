import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  id: string = '';

  constructor(private authService: AuthService) {}

  signup(): void {
    this.authService.signUp(this.firstName, this.lastName, this.email, this.password,this.id);
  }
}
