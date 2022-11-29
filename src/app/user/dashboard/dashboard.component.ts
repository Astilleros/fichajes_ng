import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersEditComponent } from '../user-edit/user-edit.component';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';

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
  now:Date = new Date();
  licenseDate: Date | null = null;

  constructor(
    private Dialogs: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private User: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await firstValueFrom( this.User.profile() );
    if(this.user.licensedUntil) this.licenseDate = new Date(this.user.licensedUntil);
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

  async goNewCheckout(){
    const checkout = await firstValueFrom(this.User.getNewCheckout())
    window.open(checkout.checkout.url, "_blank");
  }
}
