import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs/operators';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  imgCodeUrl: string;
  isSpinning = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isSpinning = true;
      const { value } = this.validateForm;

      this.loginService.login(value)
        .pipe(finalize(() => this.isSpinning = false))
        .subscribe((resp: any) => {
          this.cookieService.set('info', JSON.stringify(resp));
          this.router.navigate(['/main']);
        });
    }
  }
}
