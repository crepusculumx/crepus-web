import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Menu {
  level: number;
  title: string;
  icon: string | null;
  selected: boolean;
  disabled: boolean;
  routerLink?: string[];
  open?: boolean;
  children?: Menu[];
}

export type Menus = Menu[];

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private mockMenus: Menus = [
    {
      level: 1,
      title: 'Mail Group',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title:
                'Option 1三诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼',
              icon: null,
              selected: false,
              disabled: false,
              open: false,
              routerLink: ['/o'],
            },
            {
              level: 3,
              icon: null,
              title: 'Option 2',
              selected: false,
              disabled: true,
              routerLink: ['w'],
            },
          ],
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false,
          routerLink: [],
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false,
          routerLink: [],
        },
      ],
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false,
        },
      ],
    },
  ];
  private _menus$ = new BehaviorSubject<Menus>(this.mockMenus);
  get menus$(): BehaviorSubject<Menus> {
    return this._menus$;
  }
}
