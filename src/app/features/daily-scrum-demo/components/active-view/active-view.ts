import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyDemoSessionService } from '../../services/daily-demo-session.service';
import {
  computeStrokeDashoffset,
  formatTime,
  getInitials,
  getSpeakerTimerColor,
} from '../../utils/daily-demo.utils';
import { DemoStory, Participant, Task } from '../../models/daily-demo.model';

@Component({
  selector: 'app-active-view',
  imports: [FormsModule],
  templateUrl: './active-view.html',
})
export class ActiveView {
  protected readonly session = inject(DailyDemoSessionService);
  protected readonly formatTime = formatTime;
  protected readonly getInitials = getInitials;
  protected readonly computeStrokeDashoffset = computeStrokeDashoffset;
  protected readonly getSpeakerTimerColor = getSpeakerTimerColor;
  protected readonly Math = Math;

  protected readonly speaker = computed(() => this.session.currentSpeaker());

  tasksInProgress(participant: Participant): Task[] {
    return this.filteredTasks(participant).filter((t) => t.state !== 2);
  }

  tasksDone(participant: Participant): Task[] {
    return this.filteredTasks(participant).filter((t) => t.state === 2);
  }

  storiesCompletedCount(participant: Participant): number {
    return this.filteredStories(participant).filter((s) => s.progress === 100).length;
  }

  filteredTasks(participant: Participant): Task[] {
    const q = this.session.taskSearchText().trim().toLowerCase();
    return this.session
      .getSpeakerTasks(participant)
      .filter((t) => !q || t.name.toLowerCase().includes(q));
  }

  filteredStories(participant: Participant): DemoStory[] {
    const q = this.session.storySearchText().trim().toLowerCase();
    return this.session
      .getSpeakerStories(participant)
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q),
      );
  }

  nextButtonLabel(): string {
    const speaker = this.session.currentSpeaker();
    const idx = this.session.currentIndex();
    const len = this.session.queue().length;
    if (!speaker) return 'Siguiente';
    if (speaker.isParkingLot) return 'Finalizar Reunión';
    if (idx === len - 2) return 'Siguiente (Parking Lot)';
    return 'Siguiente';
  }
}
