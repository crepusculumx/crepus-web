import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor() {}

  public startup() {
    return of(true);
  }
}
