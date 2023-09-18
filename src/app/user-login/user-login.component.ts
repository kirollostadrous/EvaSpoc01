import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MasterService } from '../service/master.service';
import { error } from 'jquery';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup<any>;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: MasterService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    const requestBody = {
      userName: userName,
      password: password,
    };
    if (this.loginForm.valid) {
      this.loginService.Onlogin(requestBody).subscribe(
        (response: any) => {
          // Check if the username and password are correct
          if (
            response.userName === userName &&
            response.password === password
          ) {
            this.toastr.success('User logged in successfully');
            this.router.navigate(['/dashboard']); // Redirect to the main page
          } else {
            this.toastr.error('Invalid username or password');
          }
        },
        (error: any) => {
          console.log(error); // Handle the error if necessary
        }
      );
    } else {
      this.toastr.warning('Please enter a valid username & password');
    }
  }
}
