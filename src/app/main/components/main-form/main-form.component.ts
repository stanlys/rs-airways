/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group({
      oneWay: fb.control(false, Validators.required),
      airport: fb.group({
        from: fb.control('', Validators.required),
        to: fb.control('', Validators.required),
      }),
      dates: fb.group({
        from: fb.control(null, Validators.required),
        to: fb.control(null, Validators.required),
      }),
      passengers: fb.group(
        {
          adult: fb.control(0, [Validators.required, Validators.pattern(/^[0-9]+(?!.)/), Validators.min(1)]),
          child: fb.control(0, [Validators.required, Validators.pattern(/^[0-9]+(?!.)/)]),
          infant: fb.control(0, [Validators.required, Validators.pattern(/^[0-9]+(?!.)/)]),
        },
        Validators.required
      ),
    });
  }

  public async onSubmit(): Promise<void> {
    console.log('submit', this.searchForm.valid);

    if (!this.searchForm.valid) return;

    if (this.searchForm.valid) return;

    await this.router.navigate(['/booking']);

    console.log(this.searchForm.value);
  }
}
