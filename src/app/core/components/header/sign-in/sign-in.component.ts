import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  @Input() public authModalActive!: boolean;

  @Output() public authDisplay = new EventEmitter<boolean>();

  public toggleAuth(): void {
    this.authDisplay.emit(!this.authModalActive);
  }

  constructor(public translate: TranslateService) {}
}
