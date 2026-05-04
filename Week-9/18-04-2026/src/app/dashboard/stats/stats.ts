import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent {
  @Input() userStats: { name: string; score: number; level: number } = {
    name: '',
    score: 0,
    level: 1
  };

  get tier(): string {
    if (this.userStats.score >= 100) return 'Gold';
    if (this.userStats.score >= 50)  return 'Silver';
    return 'Bronze';
  }
}