import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyDemoSessionService } from '../../services/daily-demo-session.service';

@Component({
  selector: 'app-setup-view',
  imports: [FormsModule],
  templateUrl: './setup-view.html',
})
export class SetupView {
  protected readonly session = inject(DailyDemoSessionService);
  protected readonly startError = signal<string | null>(null);

  protected iceToken = '';

  onSync(): void {
    this.session.mockSyncIceScrum(this.iceToken);
  }

  onProjectChange(pkey: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.session.toggleProjectPkey(pkey, checked);
  }

  isProjectChecked(pkey: string): boolean {
    return this.session.selectedPkeys().includes(pkey);
  }

  onManualSubmit(event: Event): void {
    event.preventDefault();
    this.session.addManualParticipant(this.session.manualName());
  }

  startDaily(): void {
    const ok = this.session.startDaily();
    this.startError.set(ok ? null : 'Agregá participantes primero.');
  }
}
