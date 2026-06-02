import { Component, computed, inject } from '@angular/core';
import { DailyDemoSessionService } from '../../services/daily-demo-session.service';
import { computeStrokeDashoffset, formatTime, getResultClassification } from '../../utils/daily-demo.utils';
import { SpeakerResult } from '../../models/daily-demo.model';

@Component({
  selector: 'app-summary-view',
  imports: [],
  templateUrl: './summary-view.html',
})
export class SummaryView {
  protected readonly session = inject(DailyDemoSessionService);
  protected readonly formatTime = formatTime;
  protected readonly getResultClassification = getResultClassification;
  protected readonly computeStrokeDashoffset = computeStrokeDashoffset;
  protected readonly Math = Math;

  protected readonly sprintProgress = computed(() => this.session.getSprintProgress());

  protected averageTime(): number {
    const valid = this.session.results().filter((r) => !r.skipped && !r.isParkingLot);
    if (!valid.length) return 0;
    return Math.round(valid.reduce((acc, r) => acc + r.time, 0) / valid.length);
  }

  protected fastestName(): string {
    const sorted = this.validResults().sort((a, b) => a.time - b.time);
    return sorted[0]?.name ?? '-';
  }

  protected slowestName(): string {
    const sorted = this.validResults().sort((a, b) => b.time - a.time);
    return sorted[0]?.name ?? '-';
  }

  protected delayLabel(): string {
    const d = this.session.startDelaySeconds();
    if (d > 0) return 'Demora en Iniciar';
    if (d < 0) return 'Inicio Anticipado';
    return 'Inicio Puntual';
  }

  protected delayClass(): string {
    const d = this.session.startDelaySeconds();
    if (d > 0) return 'text-accent-danger';
    if (d < 0) return 'text-accent-primary';
    return 'text-accent-info';
  }

  private validResults(): SpeakerResult[] {
    return this.session.results().filter((r) => !r.skipped && !r.isParkingLot);
  }
}
