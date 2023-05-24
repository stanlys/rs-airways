import { Component, OnDestroy } from '@angular/core';
import { IContacts, PassengersFormValue } from '../../interfaces/process.interface';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
})
export class ProcessPageComponent implements OnDestroy {
  public isPassengersValid = false;

  public isContactsValid = false;

  private newPassenggers!: PassengersFormValue[];

  private newContacts!: IContacts;

  constructor(private progress: ProgressService) {}

  public ngOnDestroy(): void {
    this.progress.updateData(this.newPassenggers, this.newContacts);
  }

  public chechPassengers(value: boolean): void {
    this.isPassengersValid = value;
  }

  public getPassengers(value: PassengersFormValue[]): void {
    this.newPassenggers = value;
  }

  public checkContacts(value: boolean): void {
    this.isContactsValid = value;
  }

  public getDetails(value: IContacts): void {
    this.newContacts = value;
  }
}
