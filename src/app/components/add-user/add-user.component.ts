// import { Component } from '@angular/core';
// import { UserService } from 'src/app/app.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent {
  
//     constructor(private service: UserService, private router: Router) { }
  
//     ngOnInit(): void {
//     }
//     data: any

//     form = new FormGroup({
//       name: new FormControl('', Validators.required),
//       email: new FormControl('', Validators.required),
//       address: new FormControl('', Validators.required),
//       gender: new FormControl('', Validators.required),
//     });

//     addUser() {
//       this.data = this.form.value;
//       this.service.addUser(this.data).subscribe(data => {
//         // redirect to home page
//         this.router.navigate(['/']);
//         console.log('User added successfully', data);
//       });
//     }
// }



import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/app.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  data: User = {
    id: undefined,
    username: '',
    email: '',
    address: '',
    gender: ''
  };

  constructor(private service: UserService, private router: Router) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      this.data = this.form.value as User;
      this.service.addUser(this.data).subscribe({
        next: (data: User) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error adding user', error);
          }
        }
      });
    }
  }
}
