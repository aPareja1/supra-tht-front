


import { IHandle } from '../../core/domain/events/IHandle';
import { Injectable } from '@angular/core';
import { Observable, Subject, UnaryFunction,pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable(
  { providedIn: 'root' }
)
export class AfterCartCreated implements IHandle{
  private cartCreatedSubject = new Subject<void>();



  get cartCreated$(): Observable<void> {
    return this.cartCreatedSubject.asObservable();
  }

  onPipe(): UnaryFunction<any, any> {
    return pipe(
      tap(() => {
        this.cartCreatedSubject.next();
      }),
      map((val) => val)
    );
  }
}
