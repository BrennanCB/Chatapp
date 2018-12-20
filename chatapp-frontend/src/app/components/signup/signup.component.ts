import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isArray } from 'lodash';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  private init() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }
  public ngOnInit() {
    this.init();
  }
  public signupUser(): void {
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      console.log(data);
      this.signupForm.reset();
      this.errorMessage = undefined;
    }, error => {
      console.error(error);

      console.log(isArray(error.error.message));

      if (isArray(error.error.message)) {
        this.errorMessage = error.error.message[0].message;
      } else {
        this.errorMessage = error.error.message;
      }

      console.log(this.errorMessage);
    });
  }
}
