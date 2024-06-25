// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AddUserComponent } from './components/add-user/add-user.component';
// import { UpdateUserComponent } from './components/update-user/update-user.component';
// import { ViewUserComponent } from './components/view-user/view-user.component';
// import { LoginComponent } from './components/login/login.component';
// import { AuthGuard } from './auth.guard';

// const routes: Routes = [
//   { path: '', component: ViewUserComponent, canActivate: [AuthGuard] },
//   { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] },
//   { path: 'update/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ViewUserComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


