// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserService } from 'src/app/app.service';
// import { User } from 'src/app/User';

// @Component({
//   selector: 'app-update-user',
//   templateUrl: './update-user.component.html',
//   styleUrls: ['./update-user.component.css']
// })
// export class UpdateUserComponent implements OnInit {

//   user?: any;
//   data: any;

//   constructor(private service: UserService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     this.service.getUserById(id).subscribe({
//       next: (data) => {
//         this.user = data;
//         console.log(this.user);
//         this.form.patchValue({
//           name: this.user.name,
//           email: this.user.email,
//           address: this.user.address,
//         });
//       },
//       error: (error) => {
//         if (error.status === 401) {
//           this.router.navigate(['/login']);
//         } else {
//           console.error('Error fetching user', error);
//         }
//       }
//     });
//   }

//   form = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     email: new FormControl('', [Validators.required]),
//     address: new FormControl('', [Validators.required]),
//   });

//   submit(): void {
//     if (this.form.valid) {
//       this.data = this.form.value;
//       this.user.name = this.data.name;
//       this.user.email = this.data.email;
//       this.user.address = this.data.address;
//       console.log(this.data);

//       this.service.updateUser(this.user?.id, this.user).subscribe({
//         next: (data) => {
//           console.log(data);
//           this.router.navigate(['/']);
//         },
//         error: (error) => {
//           if (error.status === 401) {
//             this.router.navigate(['/login']);
//           } else {
//             console.error('Error updating user', error);
//           }
//         }
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/app.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User = {
    id: undefined,
    username: '',
    email: '',
    address: '',
    gender: ''
  };
  data: any;

  constructor(private service: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getUserById(id).subscribe({
      next: (data: User) => {
        this.user = data;
        console.log(this.user);
        this.form.patchValue({
          username: this.user.username,
          email: this.user.email,
          address: this.user.address,
        });
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error('Error fetching user', error);
        }
      }
    });
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      this.data = this.form.value;
      this.user.username = this.data.username;
      this.user.email = this.data.email;
      this.user.address = this.data.address;
      console.log(this.data);

      this.service.updateUser(this.user.id!, this.user).subscribe({
        next: (data: User) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error updating user', error);
          }
        }
      });
    }
  }
}
