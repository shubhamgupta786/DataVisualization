import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    if (this.authService.signUp(this.username, this.password)) {
      this.router.navigate(['/chart']);
    } else {
      this.errorMessage = 'Username already exists!';
    }
  }
  gotoLogin(): void{

    this.router.navigate(['/login']);
  
}

}
