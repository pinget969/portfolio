import { SpeakerResult, ResultClassification } from '../models/daily-demo.model';

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function computeStrokeDashoffset(time: number, max: number, radius = 64): number {
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(time / max, 1);
  return circumference * (1 - progress);
}

export function getResultClassification(res: SpeakerResult): ResultClassification {
  if (res.skipped) return { emoji: '😴', text: 'Dormido' };
  if (res.isParkingLot) return { emoji: '💬', text: 'Debate' };

  let emojis = '';
  let text = '';

  if (res.time <= 30) {
    emojis += '⚡';
    text = 'Speedrun';
  } else if (res.time <= 60) {
    emojis += '🚀';
    text = 'Sin Bugs';
  } else if (res.time <= 120) {
    emojis += '🐢';
    text = 'Tortuga Ninja';
  } else {
    emojis += '🍿';
    text = 'Versión Extendida';
  }

  if (res.isDelayed) emojis += '⚠️';
  if (res.isLate) emojis += '🕒';

  return { emoji: emojis, text };
}

export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

export function getTimerEmoji(globalTimer: number): string {
  if (globalTimer < 600) return '😊';
  if (globalTimer < 900) return '😐';
  return '😟';
}

export function getTimerDotColor(globalTimer: number): string {
  if (globalTimer < 600) return 'bg-accent-primary shadow-[0_0_10px_#3fb950]';
  if (globalTimer < 900) return 'bg-accent-warning shadow-[0_0_10px_#d29922]';
  return 'bg-accent-danger shadow-[0_0_10px_#f85149]';
}

export function getSpeakerTimerColor(speakerTimer: number): string {
  if (speakerTimer > 120) return '#f85149';
  if (speakerTimer > 60) return '#d29922';
  return '#58a6ff';
}
