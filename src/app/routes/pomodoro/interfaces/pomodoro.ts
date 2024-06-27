export interface PomodoroInfo {
  startTime: number;
  endTime: number;
  type: string;
  message: string;
}

export type PomodoroInfos = PomodoroInfo[];
