// import { Component } from '@angular/core';
// import { UserService } from '../../app.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private userService: UserService, private router: Router) { }

//   onSubmit() {
//     this.userService.login(this.username, this.password).subscribe(
//       response => {
//         console.log('Login successful');
//         this.router.navigate(['/']);
//       },
//       error => {
//         console.error('Login failed', error);
//       }
//     );
//   }
// }


// import { Component } from '@angular/core';
// import { UserService } from '../../app.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = 'Login Failed!'; 

//   constructor(private userService: UserService, private router: Router) { }

//   onSubmit() {
//     this.errorMessage = 'Login Failed'; 
//     console.log(this.errorMessage)
//     this.userService.login(this.username, this.password).subscribe(
//       response => {
//         console.log("checking")
//         console.log('Login successful');
//         this.router.navigate(['/']);
//       },
//       error => {
//         console.error('Login failed', error);
//         this.errorMessage = 'Login failed. Please check your credentials.'; 
//       }
//     );
//   }
// }



// import { Component } from '@angular/core';
// import { UserService } from '../../app.service';
// import { Router } from '@angular/router';
// import { catchError } from 'rxjs/operators';
// import { of } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private userService: UserService, private router: Router) { }

//   onSubmit() {
//     this.errorMessage = 'Login Failed';
//     console.log(this.errorMessage);
//     this.userService.login(this.username, this.password).pipe(
//       catchError(error => {
//         console.error('Login failed', error);
//         this.errorMessage = 'Login failed. Please check your credentials.';
//         return of(null);
//       })
//     ).subscribe(
//       response => {
//         if (response) {
//           console.log("checking");
//           console.log('Login successful');
//           this.router.navigate(['/']);
//         }
//       }
//     );
//   }
// }



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../../app.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private userService: UserService, private router: Router) { }

//   onSubmit() {
//     this.userService.login(this.username, this.password).subscribe(
//       data => {
//         localStorage.setItem('access_token', data.access);
//         localStorage.setItem('refresh_token', data.refresh);
//         this.router.navigate(['/']);
//       },
//       error => {
//         console.error('Login error', error);
//         this.errorMessage = 'Invalid username or password';
//       }
//     );
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    console.log('Attempting login with username:', this.username);
    this.userService.login(this.username, this.password).subscribe(
      (data) => {
        console.log('Login response data:', data);
        if (data.access && data.refresh) {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          console.log('Tokens stored, navigating to /users');
          this.router.navigate(['/users']);
        } else {
          console.error('No tokens received');
        }
      },
      (error) => {
        console.error('Login error', error);
        console.log("Login failed")
      }
    );
  }
}
