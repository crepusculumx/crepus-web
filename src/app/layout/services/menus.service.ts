import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menus } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private _menus$ = new BehaviorSubject<Menus>([]);
  get menus$(): BehaviorSubject<Menus> {
    return this._menus$;
  }
}
