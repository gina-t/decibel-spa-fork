import { UserLogin } from '../interfaces/UserLogin';

// Use the AuthService to save the user info and token to local storage once the user submits the login form

class AuthService {
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Return true if token exists, otherwise false
  }

  getToken(): string {
    const token = localStorage.getItem('id_token') || '';
    return token;
  }

  getUser(): UserLogin | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(idToken: string, user: UserLogin): void {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  register(idToken: string, user: UserLogin): void {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    window.location.assign('/');
  }
}

export default new AuthService();
// the same instance of AuthService will be used throughout app wherever it is imported, useful for authentication