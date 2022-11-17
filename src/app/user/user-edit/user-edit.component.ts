import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UsersEditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UsersEditComponent>,
    private Users: UserService,
    private FB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {}

  user: any;
  @Output() userOut = new EventEmitter<User>();

  formEditUser: FormGroup = this.FB.group({
    nombre: this.FB.control('', [Validators.required]),
    dni: this.FB.control('', [Validators.required]),
    email: this.FB.control('', [Validators.required]),
    mobile: this.FB.control('', [Validators.required]),
    empresa: this.FB.control('', [Validators.required]),
    cif: this.FB.control('', [Validators.required]),
    sede: this.FB.control('', [Validators.required]),
  });

  ngOnInit(): void {
    this.user = this.data;

    let value = Object.keys(this.formEditUser.value).reduce(
      (acc: any, key: string) => ({ ...acc, ...{ [key]: this.user[key] } }),
      {}
    );
    this.formEditUser.patchValue(value);
    this.formEditUser.valueChanges.subscribe(this.onChange);
  }

  onChange = (user: User) => {
    if (this.formEditUser?.invalid) return;
    if (this.user) {
      this.Users.update({
        ...this.user,
        ...user,
      }).subscribe((user: User) => {
        this.user = user
        console.log(user);
      });
    }

  };

  close() {
    this.userOut.emit(this.user);
    this.dialogRef.close();
  }
}
