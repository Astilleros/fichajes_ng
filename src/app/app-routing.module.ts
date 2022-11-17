import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { WorkersIdComponent } from './worker/worker-edit/worker-edit.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { AuthGuardService } from './auth/loged.guard';
import { DashboardComponent } from './user/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'workers',
    component: WorkerListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'workers/:_id',
    component: WorkersIdComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks/:_id',
    component: TaskListComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
