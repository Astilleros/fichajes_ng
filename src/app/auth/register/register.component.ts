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
    username: new FormControl('a'),
    email: new FormControl('a'),
    password: new FormControl('a'),
    nombre: new FormControl('a'),
    dni: new FormControl('a'),
    mobile: new FormControl('a'),
    empresa: new FormControl('a'),
    cif: new FormControl('a'),
    sede: new FormControl('a'),
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
