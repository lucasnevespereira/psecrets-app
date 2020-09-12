import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  authForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private authService: AuthService) {
    this.authForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }


  get email () {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }


  ngOnInit(): void {
  }

  onSignup() {
    if(this.authForm.invalid) {
      return;
    }
    const {email, password} = this.authForm.value;

    this.authService.createUser(email, password);
    
  }

  onClickIcon() {
    this.showPassword = !this.showPassword;
  }

}
