import { Directive, OnDestroy } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Directive() // @Directive() for error: Class is using Angular features but is not decorated. Please add an explicit Angular decorator
export class BaseComponent implements OnDestroy {
  public destroy$ = new AsyncSubject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
