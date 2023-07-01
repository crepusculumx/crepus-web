import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum LayoutType {
  basic = 'basic',
  blank = 'blank',
}
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _CurLayout$ = new BehaviorSubject<LayoutType>(LayoutType.basic);
  get CurLayout$(): BehaviorSubject<LayoutType> {
    return this._CurLayout$;
  }
  public quitBlank() {
    this._CurLayout$.next(LayoutType.basic);
  }

  public enterBlank() {
    this._CurLayout$.next(LayoutType.blank);
  }
}
