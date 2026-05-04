import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  @Input() userStats: { name: string; score: number; level: number } = {
    name: '',
    score: 0,
    level: 1
  };

  mutateLog: string[] = [];
  immutableLog: string[] = [];
  cdrLog: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  updateByMutation(): void {
    this.userStats.score += 10;
    this.mutateLog.push(
      `Mutated score to ${this.userStats.score} — Dashboard view did NOT update`
    );
  }

  updateByImmutableCopy(): void {
    this.userStats = { ...this.userStats, score: this.userStats.score + 10 };
    this.immutableLog.push(
      `New object created, score = ${this.userStats.score} — Dashboard UPDATED`
    );
  }

  updateWithMarkForCheck(): void {
    this.userStats.score += 10;
    this.cdr.markForCheck();
    this.cdrLog.push(
      `markForCheck called, score = ${this.userStats.score} — Dashboard UPDATED`
    );
  }
}