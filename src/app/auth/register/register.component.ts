import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl('Introduce tu nombre'),
    dni: new FormControl('00000000A'),
    mobile: new FormControl('012345678'),
    empresa: new FormControl('Introduce el nombre de la empresa'),
    cif: new FormControl('00000000A'),
    sede: new FormControl('Introducela dirección de la empresa'),
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.form.valid) return;

    this.authService.register(this.form.getRawValue()).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
