/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Airport } from '../../model/main.interfaces';
import { AIRPORTS } from '../../model/mock-list.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  public searchForm: FormBuilder;

  constructor() {
    this.searchForm = new FormBuilder();
  }
}
