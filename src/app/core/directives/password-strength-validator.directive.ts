import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

class PasswordStrengthValidationError {
  public matches = false;

  constructor(public message: string, value: string, ...patterns: RegExp[]) {
    this.matches = patterns.every((pattern) => pattern.test(value));
  }
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const errs: PasswordStrengthValidationError[] = [];

    if (control.value?.length) {
      const upperLower = new PasswordStrengthValidationError(
        'a mixture of both uppercase and lowercase letters',
        control.value,
        /[a-z]/,
        /[A-Z]/
      );
      const alphanum = new PasswordStrengthValidationError(
        'a mixture of letters and numbers',
        control.value,
        /[a-zA-Z]/,
        /[0-9]/
      );

      errs.push(upperLower, alphanum);
    }

    for (let i = 0; i < errs.length; i += 1) {
      const { matches, message } = errs[i];

      if (!matches) {
        return { passwordStrength: message };
      }
    }

    return null;
  };
}
