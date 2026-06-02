import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import {
  cloneStories,
  cloneTasks,
  INITIAL_DEMO_STORIES,
  INITIAL_DEMO_TASKS,
  MOCK_HISTORY_SESSIONS,
  MOCK_ICE_PROJECTS,
  MOCK_ICE_USERS,
  MOCK_SPRINT_NAME,
} from '../data/mock-icescrum.data';
import {
  DailyTab,
  DailyView,
  DemoStory,
  IceProject,
  IceUser,
  MockHistorySession,
  Participant,
  SpeakerResult,
  Task,
} from '../models/daily-demo.model';
import { getTimerDotColor, getTimerEmoji } from '../utils/daily-demo.utils';

const PARTICIPANTS_KEY = 'daily-demo-participants';
const PLANNED_TIME_KEY = 'daily-demo-planned-start';

@Injectable()
export class DailyDemoSessionService {
  private readonly destroyRef = inject(DestroyRef);

  readonly activeTab = signal<DailyTab>('daily');
  readonly view = signal<DailyView>('setup');

  readonly participants = signal<Participant[]>(this.loadParticipants());
  readonly queue = signal<Participant[]>([]);
  readonly currentIndex = signal(-1);
  readonly results = signal<SpeakerResult[]>([]);

  readonly globalTimer = signal(0);
  readonly speakerTimer = signal(0);
  readonly isPaused = signal(false);
  readonly pauseCount = signal(0);
  readonly totalPauseSeconds = signal(0);
  readonly currentSpeakerPauseSeconds = signal(0);

  readonly plannedStartTime = signal(this.loadPlannedTime());
  readonly startDelaySeconds = signal(0);
  readonly actualStartTimestamp = signal<number | null>(null);

  readonly availableProjects = signal<IceProject[]>([]);
  readonly selectedPkeys = signal<string[]>(['INFRAESTRU']);
  readonly iceUsers = signal<IceUser[]>([]);
  readonly iceLoading = signal(false);
  readonly iceSynced = signal(false);
  readonly iceError = signal<string | null>(null);
  readonly warnings = signal<string[]>([]);

  readonly demoTasks = signal<Task[]>(cloneTasks(INITIAL_DEMO_TASKS));
  readonly demoStories = signal<DemoStory[]>(cloneStories(INITIAL_DEMO_STORIES));

  readonly pickerOpen = signal(false);
  readonly userSearchText = signal('');
  readonly manualName = signal('');
  readonly taskSearchText = signal('');
  readonly storySearchText = signal('');

  readonly historySessions = signal<MockHistorySession[]>(MOCK_HISTORY_SESSIONS);
  readonly selectedHistorySession = signal<MockHistorySession | null>(null);

  readonly timerEmoji = computed(() => getTimerEmoji(this.globalTimer()));
  readonly timerDotColor = computed(() => getTimerDotColor(this.globalTimer()));
  readonly currentSpeaker = computed(() => {
    const q = this.queue();
    const idx = this.currentIndex();
    return idx >= 0 && idx < q.length ? q[idx] : null;
  });
  readonly prevSpeaker = computed(() => {
    const idx = this.currentIndex();
    return idx > 0 ? this.queue()[idx - 1] : null;
  });
  readonly nextSpeakerParticipant = computed(() => {
    const idx = this.currentIndex();
    const q = this.queue();
    return idx >= 0 && idx < q.length - 1 ? q[idx + 1] : null;
  });

  readonly filteredPickUsers = computed(() => {
    const excluded = new Set(this.participants().map((p) => p.iceScrumUserId).filter(Boolean));
    const q = this.userSearchText().trim().toLowerCase();
    const pkeys = new Set(this.selectedPkeys());

    return this.iceUsers().filter((u) => {
      if (excluded.has(u.id)) return false;
      if (pkeys.size && !u.projects.some((p) => pkeys.has(p.pkey))) return false;
      if (!q) return true;
      const haystack = `${u.nombre} ${u.projects.map((p) => p.pkey).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  });

  private pauseStartedAt: number | null = null;
  private lastRecordedIndex = -1;
  private timersRunning = false;

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.tick());
  }

  setActiveTab(tab: DailyTab): void {
    this.activeTab.set(tab);
    if (tab === 'historial') {
      this.selectedHistorySession.set(null);
    }
  }

  setPlannedStartTime(value: string): void {
    const time = value || '09:30';
    this.plannedStartTime.set(time);
    localStorage.setItem(PLANNED_TIME_KEY, time);
  }

  async mockSyncIceScrum(_token: string): Promise<void> {
    this.iceLoading.set(true);
    this.iceError.set(null);
    this.warnings.set([]);

    await new Promise((r) => setTimeout(r, 1500));

    this.availableProjects.set([...MOCK_ICE_PROJECTS]);
    this.iceUsers.set([...MOCK_ICE_USERS]);
    this.iceSynced.set(true);
    this.iceLoading.set(false);
  }

  toggleProjectPkey(pkey: string, checked: boolean): void {
    this.selectedPkeys.update((keys) => {
      if (checked) return keys.includes(pkey) ? keys : [...keys, pkey];
      return keys.filter((k) => k !== pkey);
    });
  }

  togglePicker(): void {
    if (this.selectedPkeys().length === 0) return;
    this.pickerOpen.update((v) => !v);
  }

  closePicker(): void {
    this.pickerOpen.set(false);
  }

  setUserSearch(text: string): void {
    this.userSearchText.set(text);
  }

  getTasksByUserCount(userId: number): number {
    return this.demoTasks().filter((t) => t.responsible && Number(t.responsible.id) === userId).length;
  }

  addParticipantFromIce(user: IceUser): void {
    if (this.participants().some((p) => p.iceScrumUserId === user.id)) return;
    this.participants.update((list) => [
      ...list,
      {
        id: String(user.id),
        name: user.nombre,
        iceScrumUserId: user.id,
        isLate: false,
        isDelayed: false,
        excludeFromRotation: false,
      },
    ]);
    this.persistParticipants();
    this.userSearchText.set('');
    this.pickerOpen.set(false);
  }

  addManualParticipant(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    this.participants.update((list) => [
      ...list,
      {
        id: `manual-${Date.now()}`,
        name: trimmed,
        isLate: false,
        isDelayed: false,
        excludeFromRotation: false,
      },
    ]);
    this.manualName.set('');
    this.persistParticipants();
  }

  removeParticipant(id: string): void {
    this.participants.update((list) => list.filter((p) => p.id !== id));
    this.persistParticipants();
  }

  clearParticipants(): void {
    this.participants.set([]);
    this.persistParticipants();
  }

  toggleParticipantFlag(id: string, field: 'isLate' | 'isDelayed' | 'excludeFromRotation'): void {
    this.participants.update((list) =>
      list.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p)),
    );
    this.persistParticipants();
  }

  toggleCurrentSpeakerFlag(field: 'isLate' | 'isDelayed'): void {
    const idx = this.currentIndex();
    this.queue.update((q) => q.map((s, i) => (i === idx ? { ...s, [field]: !s[field] } : s)));
  }

  startDaily(): boolean {
    if (this.participants().length === 0) return false;

    this.results.set([]);
    this.pauseCount.set(0);
    this.totalPauseSeconds.set(0);
    this.currentSpeakerPauseSeconds.set(0);
    this.isPaused.set(false);
    this.pauseStartedAt = null;
    this.lastRecordedIndex = -1;
    this.globalTimer.set(0);
    this.speakerTimer.set(0);
    this.taskSearchText.set('');
    this.storySearchText.set('');

    const now = Date.now();
    this.actualStartTimestamp.set(now);
    this.startDelaySeconds.set(this.calculateStartDelay(now));

    const rotation = this.participants()
      .filter((p) => !p.excludeFromRotation)
      .sort(() => Math.random() - 0.5);

    const parkingLot: Participant = {
      id: 'parking-lot',
      name: 'Preguntas / Parking Lot',
      isLate: false,
      isDelayed: false,
      excludeFromRotation: true,
      isParkingLot: true,
    };

    this.queue.set([...rotation, parkingLot]);
    this.currentIndex.set(0);
    this.timersRunning = true;
    this.view.set('active');
    return true;
  }

  goToNextSpeaker(): void {
    this.advanceSpeaker(false);
  }

  skipSpeaker(): void {
    this.advanceSpeaker(true);
  }

  togglePause(): void {
    const paused = !this.isPaused();
    this.isPaused.set(paused);
    if (paused) {
      this.pauseCount.update((c) => c + 1);
      this.pauseStartedAt = Date.now();
    } else if (this.pauseStartedAt) {
      const secs = Math.floor((Date.now() - this.pauseStartedAt) / 1000);
      this.totalPauseSeconds.update((t) => t + secs);
      this.currentSpeakerPauseSeconds.update((t) => t + secs);
      this.pauseStartedAt = null;
    }
  }

  finishDaily(): void {
    if (this.view() === 'summary') return;

    if (this.isPaused() && this.pauseStartedAt) {
      const secs = Math.floor((Date.now() - this.pauseStartedAt) / 1000);
      this.totalPauseSeconds.update((t) => t + secs);
      this.currentSpeakerPauseSeconds.update((t) => t + secs);
      this.pauseStartedAt = null;
      this.isPaused.set(false);
    }

    this.ensureCurrentRecorded();
    this.timersRunning = false;
    this.view.set('summary');
  }

  resetToSetup(): void {
    this.timersRunning = false;
    this.view.set('setup');
    this.activeTab.set('daily');
    this.globalTimer.set(0);
    this.speakerTimer.set(0);
    this.currentIndex.set(-1);
    this.queue.set([]);
    this.results.set([]);
  }

  selectHistorySession(session: MockHistorySession | null): void {
    this.selectedHistorySession.set(session);
  }

  getSpeakerSimId(speaker: Participant): number | null {
    if (speaker.iceScrumUserId) return speaker.iceScrumUserId;
    const lower = speaker.name.toLowerCase();
    if (lower.includes('nelson')) return 1;
    if (lower.includes('mariano')) return 2;
    if (lower.includes('omar')) return 3;
    if (lower.includes('alexis')) return 4;
    if (lower.includes('nahuel')) return 5;
    if (lower.includes('juan')) return 6;
    return null;
  }

  getSpeakerTasks(speaker: Participant): Task[] {
    const id = this.getSpeakerSimId(speaker);
    if (!id) return [];
    return this.demoTasks().filter((t) => t.responsible && Number(t.responsible.id) === id);
  }

  getSpeakerStories(speaker: Participant): DemoStory[] {
    const tasks = this.getSpeakerTasks(speaker);
    const names = new Set(tasks.map((t) => t.parentStory?.name || ''));
    return this.demoStories().filter((s) => names.has(s.name) || names.has(s.code));
  }

  getSprintProgress(): { percent: number; donePts: number; totalPts: number; completedStories: number; totalStories: number; completedTasks: number; totalTasks: number } {
    const stories = this.demoStories();
    const tasks = this.demoTasks();
    const totalPts = stories.reduce((acc, s) => acc + s.effort, 0);
    const donePts = stories.reduce((acc, s) => acc + (s.progress === 100 ? s.effort : 0), 0);
    const percent = totalPts > 0 ? Math.round((donePts / totalPts) * 100) : 68;

    return {
      percent,
      donePts,
      totalPts,
      completedStories: stories.filter((s) => s.progress === 100).length,
      totalStories: stories.length,
      completedTasks: tasks.filter((t) => t.state === 2).length,
      totalTasks: tasks.length,
    };
  }

  getFormattedDate(): string {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return `${capitalized}, ${today.getDate()} de ${today.toLocaleString('es-ES', { month: 'long' })} de ${today.getFullYear()}`;
  }

  getActiveSprintName(): string {
    return MOCK_SPRINT_NAME;
  }

  private tick(): void {
    if (!this.timersRunning || this.view() !== 'active') return;
    if (!this.isPaused()) {
      this.globalTimer.update((t) => t + 1);
      this.speakerTimer.update((t) => t + 1);
    }
  }

  private advanceSpeaker(skipped: boolean): void {
    this.recordCurrent(skipped);
    const next = this.currentIndex() + 1;
    if (next >= this.queue().length) {
      this.finishDaily();
      return;
    }
    this.currentIndex.set(next);
    this.speakerTimer.set(0);
    this.currentSpeakerPauseSeconds.set(0);
  }

  private recordCurrent(skipped: boolean): void {
    const idx = this.currentIndex();
    if (idx < 0 || idx >= this.queue().length || this.lastRecordedIndex === idx) return;

    const speaker = this.queue()[idx];
    this.results.update((list) => [
      ...list,
      {
        name: speaker.name,
        time: skipped ? 0 : this.speakerTimer(),
        pauseTime: this.currentSpeakerPauseSeconds(),
        isLate: speaker.isLate,
        isDelayed: speaker.isDelayed,
        skipped,
        isParkingLot: Boolean(speaker.isParkingLot),
      },
    ]);
    this.lastRecordedIndex = idx;
  }

  private ensureCurrentRecorded(): void {
    const idx = this.currentIndex();
    if (idx < 0 || idx >= this.queue().length || this.lastRecordedIndex === idx) return;
    this.recordCurrent(false);
  }

  private calculateStartDelay(actualStart: number): number {
    const [hours, minutes] = this.plannedStartTime().split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;
    const planned = new Date(actualStart);
    planned.setHours(hours, minutes, 0, 0);
    return Math.floor((actualStart - planned.getTime()) / 1000);
  }

  private loadParticipants(): Participant[] {
    try {
      const raw = localStorage.getItem(PARTICIPANTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private loadPlannedTime(): string {
    return localStorage.getItem(PLANNED_TIME_KEY) || '09:30';
  }

  private persistParticipants(): void {
    localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(this.participants()));
  }
}
