import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passengersValidator(): ValidatorFn {
  return (control: AbstractControl<number | null>): ValidationErrors | null => {
    if (!control.value || control.value === 0) {
      return { required: { value: control.value } };
    }
    return null;
  };
}
