import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  login(username: string, password: string): boolean {
    // In a real application, you would make an HTTP request to your backend here.
    // For this example, we'll just check if the username and password are correct.
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'dummy.token');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('token');
  }

}
