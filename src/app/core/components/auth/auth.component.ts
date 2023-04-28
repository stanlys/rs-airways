import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @Output() public closeModal = new EventEmitter<void>();

  public close(): void {
    this.closeModal.emit();
  }
}
