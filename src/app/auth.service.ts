import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
  {
    private users: { username: string; password: string }[] = [{username:"abc",password:"123"}];
    private currentUser: string | null = null;
  
    signUp(username: string, password: string): boolean {
      const userExists = this.users.some((user) => user.username === username);
      if (userExists) return false; // Username already exists
      this.users.push({ username, password });
      return true;
    }
  
    login(username: string, password: string): boolean {
      const user = this.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        this.currentUser = username;
        return true;
      }
      return false; // Invalid credentials
    }
  
    logout(): void {
      this.currentUser = null;
    }
  
    getCurrentUser(): string | null {
      return this.currentUser;
    }
}
