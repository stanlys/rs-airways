import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PassSelectOption } from '../model/main.interfaces';

export function passengersValidator(): ValidatorFn {
  return (control: AbstractControl<number | null>): ValidationErrors | null => {
    if (!control.value || control.value === 0) {
      return { required: 'Invalid value, min = 1' };
    }
    return null;
  };
}

export function selectRequiredOption(): ValidatorFn {
  return (control: AbstractControl<PassSelectOption[] | null>): ValidationErrors | null => {
    if (!control.value) return { required: 'Required field' };
    const result = control.value.find((item) => item.name === 'Adult' && item.amount);
    if (!result) {
      return { required: 'Adult is required field' };
    }
    return null;
  };
}
