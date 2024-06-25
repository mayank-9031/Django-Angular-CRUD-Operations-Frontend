// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './User';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private url: string = 'http://localhost:8000/api/users/';

//   constructor(private http: HttpClient) { }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(this.url, user);
//   }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.url);
//   }

//   getUser(id: number): Observable<User> {
//     return this.http.get<User>(`${this.url}${id}`);
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.url}${id}/`, user);
//   }

//   deleteUser(id: number): Observable<User> {
//     return this.http.delete<User>(`${this.url}${id}/`);
//   }

// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './User';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private url: string = 'http://localhost:8000/api/users/';

//   constructor(private http: HttpClient) { }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(this.url, user);
//   }

//   getUsers(page: number = 1, pageSize: number = 3): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('page_size', pageSize.toString());
//     return this.http.get<any>(this.url, { params });
//   }

//   getUser(id: number): Observable<User> {
//     return this.http.get<User>(`${this.url}${id}`);
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.url}${id}/`, user);
//   }

//   deleteUser(id: number): Observable<User> {
//     return this.http.delete<User>(`${this.url}${id}/`);
//   }
// }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User } from './User';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private url: string = 'http://localhost:8000/api/';
//   private tokenKey: string = 'auth-token';
//   private refreshTokenKey: string = 'refresh-token';

//   constructor(private http: HttpClient, private router: Router) { }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.url}users/`, user);
//   }

//   getUsers(page: number = 1, pageSize: number = 3): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('page_size', pageSize.toString());
//     return this.http.get<any>(`${this.url}users/`, { params });
//   }

//   getUser(id: number): Observable<User> {
//     return this.http.get<User>(`${this.url}users/${id}`);
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.url}users/${id}/`, user);
//   }

//   deleteUser(id: number): Observable<User> {
//     return this.http.delete<User>(`${this.url}users/${id}/`);
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.url}token/`, { username, password }).pipe(
//       tap(response => {
//         localStorage.setItem(this.tokenKey, response.access);
//         localStorage.setItem(this.refreshTokenKey, response.refresh);
//       })
//     );
//   }

//   refreshToken(): Observable<any> {
//     const refresh = localStorage.getItem(this.refreshTokenKey);
//     return this.http.post<any>(`${this.url}token/refresh/`, { refresh }).pipe(
//       tap(response => {
//         localStorage.setItem(this.tokenKey, response.access);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.refreshTokenKey);
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   isLoggedIn(): boolean {
//     return this.getToken() !== null;
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User } from './User';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private url: string = 'http://localhost:8000/api/';
//   private tokenKey: string = 'auth-token';
//   private refreshTokenKey: string = 'refresh-token';
//   private jwtHelper: JwtHelperService;

//   constructor(private http: HttpClient, private router: Router) { 
//     this.jwtHelper = new JwtHelperService();
//   }

//   private getHeaders(): HttpHeaders {
//     const token = this.getToken();
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.url}users/`, user, { headers: this.getHeaders() });
//   }

//   getUsers(page: number = 1, pageSize: number = 3): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('page_size', pageSize.toString());
//     return this.http.get<any>(`${this.url}users/`, { headers: this.getHeaders(), params });
//   }

//   getUser(id: number): Observable<User> {
//     return this.http.get<User>(`${this.url}users/${id}`, { headers: this.getHeaders() });
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.url}users/${id}/`, user, { headers: this.getHeaders() });
//   }

//   deleteUser(id: number): Observable<User> {
//     return this.http.delete<User>(`${this.url}users/${id}/`, { headers: this.getHeaders() });
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.url}token/`, { username, password }).pipe(
//       tap(response => {
//         localStorage.setItem(this.tokenKey, response.access);
//         localStorage.setItem(this.refreshTokenKey, response.refresh);
//       })
//     );
//   }

//   refreshToken(): Observable<any> {
//     const refresh = localStorage.getItem(this.refreshTokenKey);
//     return this.http.post<any>(`${this.url}token/refresh/`, { refresh }).pipe(
//       tap(response => {
//         localStorage.setItem(this.tokenKey, response.access);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.refreshTokenKey);
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     return token ? !this.jwtHelper.isTokenExpired(token) : false;
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './User';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private url: string = 'http://localhost:8000/api/';

//   constructor(private http: HttpClient) { }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.url}users/`, user);
//   }

//   getUsers(page: number = 1, pageSize: number = 3): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('page_size', pageSize.toString());
//     return this.http.get<any>(`${this.url}users/`, { params });
//   }

//   getUser(id: number): Observable<User> {
//     return this.http.get<User>(`${this.url}users/${id}/`);
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.url}users/${id}/`, user);
//   }

//   deleteUser(id: number): Observable<User> {
//     return this.http.delete<User>(`${this.url}users/${id}/`);
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.url}token/`, { username, password });
//   }

//   refreshToken(refresh: string): Observable<any> {
//     return this.http.post<any>(`${this.url}token/refresh/`, { refresh });
//   }

//   logout(refreshToken: string, accessToken: string): Observable<any> {
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
//     return this.http.post<any>(`${this.url}logout/`, { refresh_token: refreshToken }, { headers });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<any>(`${this.url}users/?page=${page}&page_size=${pageSize}`, { headers });
  }

  getUserById(id: number): Observable<User> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<User>(`${this.url}users/${id}/`, { headers });
  }

  addUser(user: User): Observable<User> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<User>(`${this.url}users/`, user, { headers });
  }

  updateUser(id: number, user: User): Observable<User> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<User>(`${this.url}users/${id}/`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${this.url}users/${id}/`, { headers });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}token/`, { username, password });
  }

  logout(refreshToken: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(`${this.url}logout/`, { refresh: refreshToken }, { headers });
  }
}
