import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersEditComponent } from '../user-edit/user-edit.component';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';
import { PaymentsComponent } from '../payments/payments.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Perfil', cols: 2, rows: 1 },
          { title: 'Licencia', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Perfil', cols: 1, rows: 1 },
        { title: 'Licencia', cols: 1, rows: 1 },
      ];
    })
  );

  user : any = {
    nombre: ''
  };
  licenseStatus?: 'active' | 'expired' | 'test' 
  licensedUntil: Date | null = null;

  constructor(
    private Dialogs: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private User: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await firstValueFrom( this.User.profile() );
    if(this.user.licensedUntil) {
      this.licensedUntil = new Date(this.user.licensedUntil);
      const now = new Date();
      if(this.licensedUntil?.getTime()?? 0 - now.getTime() > 0) this.licenseStatus = 'active'
      else this.licenseStatus = 'expired'
    }else {
      this.licenseStatus = 'test'
    }
  }

  editUserModal?: MatDialogRef<UsersEditComponent>;
  openEditDialog() {
    this.editUserModal = this.Dialogs.open(UsersEditComponent, {
      data: this.user,
    });
    this.editUserModal.componentInstance.userOut.subscribe((user: User) => {
      this.user = user;
    });
  }

  checkoutsModal?: MatDialogRef<PaymentsComponent>;
  openCheckoutsDialog() {
    this.checkoutsModal = this.Dialogs.open(PaymentsComponent, {
      data: this.user,
    });
  }

  async goNewCheckout(){
    const checkout = await firstValueFrom(this.User.getNewCheckout())
    window.open(checkout.checkout.url, "_blank");
  }
}
