//use the AuthSevice to save the user info and token to local storage once the user submits the login form
class AuthService {
  loggedIn() {
    const token = this.getToken();
    return !!token; // Return true if token exists, otherwise false
  }

  getToken(): string {
    const token = localStorage.getItem('id_token') || '';
    return token;
  }

  getUser(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(idToken: string, user: object) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    window.location.assign('/');
  }
}

export default new AuthService();
