import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {Clipboard} from '@angular/cdk/clipboard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { authInterceptorProviders } from './auth/auth.interceptor';
import { AuthGuardService } from './auth/loged.guard';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkersIdComponent } from './worker/worker-edit/worker-edit.component';
import { WorkerCreateComponent } from './worker/worker-create/worker-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TasksIdComponent } from './task/task-id/task-id.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EventsMonthsComponent } from './worker/events-months/events-months.component';
import { ChartLinearGaugeComponent } from './chart/chart-linear-gauge/chart-linear-gauge.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UsersEditComponent } from './user/user-edit/user-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { PaymentsComponent } from './user/payments/payments.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WorkerListComponent,
    WorkersIdComponent,
    WorkerCreateComponent,
    TaskListComponent,
    TasksIdComponent,
    TaskCreateComponent,
    EventsMonthsComponent,
    ChartLinearGaugeComponent,
    DashboardComponent,
    UsersEditComponent,
    PaymentsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxChartsModule,
    MatSelectModule
  ],
  providers: [
    authInterceptorProviders, 
    AuthGuardService,
    Clipboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
