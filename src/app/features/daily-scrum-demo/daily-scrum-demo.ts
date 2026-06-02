import { Component, inject, OnInit, signal } from '@angular/core';
import { PRODUCTION_DAILY_URL } from './data/mock-icescrum.data';
import { DailyDemoSessionService } from './services/daily-demo-session.service';
import { SetupView } from './components/setup-view/setup-view';
import { ActiveView } from './components/active-view/active-view';
import { SummaryView } from './components/summary-view/summary-view';
import { HistorialView } from './components/historial-view/historial-view';
import { formatTime } from './utils/daily-demo.utils';

@Component({
  selector: 'app-daily-scrum-demo',
  imports: [SetupView, ActiveView, SummaryView, HistorialView],
  providers: [DailyDemoSessionService],
  templateUrl: './daily-scrum-demo.html',
  styleUrl: './daily-scrum-demo.css',
})
export class DailyScrumDemo implements OnInit {
  protected readonly session = inject(DailyDemoSessionService);
  protected readonly productionUrl = PRODUCTION_DAILY_URL;
  protected readonly formatTime = formatTime;

  protected readonly iceToken = signal('');

  ngOnInit(): void {
    if (!this.session.iceSynced()) {
      this.session.mockSyncIceScrum('');
    }
  }

  setDailyTab(): void {
    this.session.setActiveTab('daily');
    this.session.selectHistorySession(null);
  }

  setHistorialTab(): void {
    this.session.setActiveTab('historial');
    this.session.selectHistorySession(null);
  }
}
