import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = [ 'status', 'enlace', 'createdAt', 'factura'];
  checkouts = [];

  constructor(
    private dialogRef: MatDialogRef<PaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) private user: User,
    private UserService: UserService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.checkouts = await firstValueFrom(this.UserService.getCheckouts())
  }

  go(url: string) {
    window.open(url, "_blank");
  }

  close() {
    this.dialogRef.close();
  }

}
