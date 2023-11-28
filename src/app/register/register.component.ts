import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  registerForm = this.builder.group({
    id: this.builder.control('', [Validators.required, Validators.minLength(5)]),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    email: this.builder.control('', [Validators.required, Validators.email]),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
  });

  registration() {
    if (this.registerForm.valid) {
      this.service.registerData(this.registerForm.value).subscribe((res) => {
        this.toastr.success(
          'Please contact admin for enable to access user',
          'Registration Successful'
        );
        this.router.navigate(['login']);
      });
    } else {
      console.log(this.registerForm.errors); // Log form errors to the console for debugging
      this.toastr.warning('Please check the form for errors', 'Invalid Data');
    }
  }  
}