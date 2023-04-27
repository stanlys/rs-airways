import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, delay, of } from 'rxjs';

import { AuthService } from '../../../services/auth.service';

interface LoginForm {
  login: FormControl<string | null>;
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

  public isLoading$ = new Subject<boolean>();

  @Output() public closeModal = new EventEmitter<void>();

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      login: new FormControl('', [Validators.maxLength(16)]),
      password: new FormControl('', [Validators.maxLength(32)]),
    });
  }

  public close(): void {
    this.closeModal.emit();
  }

  public onSubmit(): void {
    this.authService.login();

    this.isLoading$.next(true);

    of(false)
      .pipe(delay(300))
      .subscribe(() => {
        this.isLoading$.next(false);
        this.close();
      });
  }
}
