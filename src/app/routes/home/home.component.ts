import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  public test$ = new BehaviorSubject([{ a: 1 }]);

  ngOnInit() {
    this.test$.next([{ a: 1 }, { a: 1 }]);
  }
}
