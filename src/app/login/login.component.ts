import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isSignup='Log In';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
   
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/graph']);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
  gotoSignUp(): void{

      this.router.navigate(['/signup']);
    
  }
}
