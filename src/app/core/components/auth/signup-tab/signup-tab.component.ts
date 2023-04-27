import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, delay, of } from 'rxjs';

import { passwordStrengthValidator } from '../../../directives/password-strength-validator.directive';
import { AuthService } from '../../../services/auth.service';

interface SignupForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  confirm: FormControl<boolean | null>;
}

@Component({
  selector: 'app-signup-tab',
  templateUrl: './signup-tab.component.html',
  styleUrls: ['./signup-tab.component.scss'],
})
export class SignupTabComponent {
  public form: FormGroup<SignupForm>;

  public isLoading$ = new Subject<boolean>();

  @Output() public closeModal = new EventEmitter<void>();

  public maxDate = new Date();

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group<SignupForm>({
      login: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        passwordStrengthValidator(),
      ]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      birthDate: new FormControl(null, [Validators.required]),
      confirm: new FormControl(null, [Validators.required]),
    });
  }

  public close(): void {
    this.closeModal.emit();
  }

  public onSubmit(): void {
    this.authService.signup();

    this.isLoading$.next(true);

    of(false)
      .pipe(delay(300))
      .subscribe(() => {
        this.isLoading$.next(false);
        this.close();
      });
  }
}
