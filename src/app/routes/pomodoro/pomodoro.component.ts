import { Component, computed, signal } from '@angular/core';
import { PomodoroService } from './services/pomodoro.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, startWith, switchMap } from 'rxjs';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzSelectModule,
    FormsModule,
    NzStatisticModule,
    NzCardModule,
    NzGridModule,
    NzInputNumberModule,
    NzButtonModule,
    NzInputModule,
    NzTimelineModule,
    DatePipe,
  ],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.less',
})
export class PomodoroComponent {
  constructor(private pomodoroService: PomodoroService) {}

  types = toSignal(
    this.pomodoroService.getTypes$().pipe(startWith([] as string[])),
    { requireSync: true },
  );

  type = signal<string>('');
  timeLen = signal<number>(25);
  message = signal<string>('');
  startTime = Date.now();
  endTime = Date.now();

  deadline = signal(0);
  demoValue = 10;
  value = '';

  running = signal(false);

  startDisable = computed(() => {
    return this.type() == '';
  });

  todayInfos = toSignal(
    toObservable(this.running).pipe(
      filter((running) => {
        return !running;
      }),
      switchMap(() => {
        return this.pomodoroService.getTodayPomodoroInfos$();
      }),
    ),
  );

  totalTime = computed(() => {
    if (this.todayInfos() === undefined) {
      return undefined;
    }
    let totalDuration = 0;
    this.todayInfos()?.forEach((info) => {
      const duration = info.endTime - info.startTime;
      totalDuration += duration;
    });
    return totalDuration;
  });

  onCountdownStart() {
    this.running.set(true);
    this.startTime = Date.now();
    this.deadline.set(Date.now() + 1000 * 60 * this.timeLen());
  }
  onCountdownFinish() {
    this.endTime = Date.now();

    this.pomodoroService
      .addPomodoroInfo$({
        type: this.type(),
        message: this.message(),
        startTime: this.startTime,
        endTime: this.endTime,
      })
      .subscribe(() => {
        this.running.set(false);
      });
  }
}
