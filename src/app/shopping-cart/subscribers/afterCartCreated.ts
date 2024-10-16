


import { IHandle } from '../../core/domain/events/IHandle';
import { Injectable } from '@angular/core';
import { Observable, Subject, UnaryFunction,pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable(
  { providedIn: 'root' }
)
export class AfterCartCreated implements IHandle{
  private cartCreatedSubject = new Subject<void>();

  style = `
    font-weight: bold;
    font-size: 30px;
    color: green;
    text-shadow: 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;
  `;

  get cartCreated$(): Observable<void> {
    return this.cartCreatedSubject.asObservable();
  }

  onPipe(): UnaryFunction<any, any> {
    return pipe(
      tap(() => {
        console.log('%c Cart has been created!', this.style);
        this.cartCreatedSubject.next();
      }),
      map((val) => val)
    );
  }
}
