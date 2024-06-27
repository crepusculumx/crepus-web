import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PomodoroInfo, PomodoroInfos } from '../interfaces/pomodoro';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  constructor(private http: HttpClient) {}

  addPomodoroInfo$(pomodoroInfo: PomodoroInfo) {
    return this.http.post('pomodoro/pomodoro-info', pomodoroInfo);
  }

  getTypes$() {
    return this.http.get<string[]>('pomodoro/types');
  }

  getTodayPomodoroInfos$() {
    return this.http.get<PomodoroInfos>('pomodoro/today');
  }
}
