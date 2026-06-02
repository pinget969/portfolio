import { Component, inject } from '@angular/core';
import { DailyDemoSessionService } from '../../services/daily-demo-session.service';
import { formatTime, getResultClassification } from '../../utils/daily-demo.utils';
import { MockHistorySession } from '../../models/daily-demo.model';

@Component({
  selector: 'app-historial-view',
  imports: [],
  templateUrl: './historial-view.html',
})
export class HistorialView {
  protected readonly session = inject(DailyDemoSessionService);
  protected readonly formatTime = formatTime;
  protected readonly getResultClassification = getResultClassification;
  protected readonly Math = Math;

  formatSessionDate(ms: number): string {
    return new Date(ms).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatSessionDateLong(ms: number): string {
    return new Date(ms).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  selectSession(session: MockHistorySession): void {
    this.session.selectHistorySession(session);
  }

  averageForSession(session: MockHistorySession): number {
    const active = session.results.filter((r) => !r.skipped && !r.isParkingLot);
    if (!active.length) return 0;
    return Math.round(active.reduce((acc, r) => acc + r.time, 0) / active.length);
  }

  avgAllSessions(): string {
    const list = this.session.historySessions();
    if (!list.length) return '00:00';
    const tot = list.reduce((acc, s) => acc + s.globalTimer, 0);
    return formatTime(Math.round(tot / list.length));
  }
}
