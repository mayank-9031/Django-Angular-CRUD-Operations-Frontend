// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/User';
// import { UserService } from '../../app.service';

// @Component({
//   selector: 'app-view-user',
//   templateUrl: './view-user.component.html',
//   styleUrls: ['./view-user.component.css']
// })
// export class ViewUserComponent {
//   users: any | undefined;

//   constructor(private userService: UserService) { 
   
//   }

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(data => {
//       this.users = data;
//       console.log(data)
//     });
//   }

//   deleteUser(id: number) {
//     this.userService.deleteUser(id).subscribe(data => {
//       console.log(data);
//       this.ngOnInit();
//     });
//   }

// }


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app.service';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users: User[] = [];
  totalUsers: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage, this.pageSize);
  }

  getUsers(page: number, pageSize: number): void {
    this.userService.getUsers(page, pageSize).subscribe({
      next: (data) => {
        this.users = data.results;
        this.totalUsers = data.count;
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers(this.currentPage, this.pageSize);
      },
      error: (error) => {
        console.error('Delete error', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUsers(this.currentPage, this.pageSize);
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token') || '';
    const accessToken = localStorage.getItem('access_token') || '';
    this.userService.logout(refreshToken, accessToken).subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }
}