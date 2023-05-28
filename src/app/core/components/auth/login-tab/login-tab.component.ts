/* eslint-disable class-methods-use-this */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAuthService } from 'src/app/core/services/google.service';

import { LoginRequest } from '../../../models/requests.models';
import { AuthService } from '../../../services/auth.service';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.component.html',
  styleUrls: ['./login-tab.component.scss'],
})
export class LoginTabComponent {
  public form: FormGroup<LoginForm>;

  public hidePassword = true;

  public isLoading$ = this.authService.isLoading$;

  @Output() public closeModal = new EventEmitter<void>();

  constructor(fb: FormBuilder, private authService: AuthService, private googleAuth: GoogleAuthService) {
    this.form = fb.group({
      email: new FormControl('', [Validators.maxLength(16)]),
      password: new FormControl('', [Validators.maxLength(32)]),
    });
  }

  public close(): void {
    this.closeModal.emit();
  }

  public onSubmit(): void {
    this.authService.login(this.form.value as LoginRequest);

    this.authService.loggedIn$.subscribe((v) => {
      if (v === true) {
        this.close();
      }
    });
  }

  public async google(): Promise<void> {
    //   try {
    //     await this.googleAuth.GoogleAuth();
    //   } finally {
    //     this.close();
    //   }
  }

  public facebook(): void {
    //   this.googleAuth.FacebookAuth().finally(() => {
    //     this.close();
    //   });
  }
}
