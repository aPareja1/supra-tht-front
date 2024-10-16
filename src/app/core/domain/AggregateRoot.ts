import { BehaviorSubject, Observable, UnaryFunction } from "rxjs";
import { Entity } from "./Entity";
import { DomainEvents } from "./events/DomainEvents";
import { ActionEvents } from "./events/ActionEvents.enum";

export abstract class AggregateRoot<T> extends Entity<T> {

  private _domainEvents: any[] = [];
  private _domainObserver: Observable<AggregateRoot<T>> | undefined;
  private _domainBS: BehaviorSubject<AggregateRoot<T>> | undefined;

  get id() {
    return this._id;
  }

  get domainEvents(): any[] {
    return this._domainEvents;
  }

  get domainObserver(): Observable<AggregateRoot<T>>{
    if (!this._domainObserver) {
      throw new Error("Domain observer is not set");
    }
    return this._domainObserver;
  }

  set domainObserver(domainEvent: Observable<AggregateRoot<T>>){
    this._domainObserver = domainEvent;
  }

  get domainBS(): BehaviorSubject<AggregateRoot<T>>{
    if (!this._domainBS) {
      throw new Error("Domain BehaviorSubject is not set");
    }
    return this._domainBS;
  }

  set domainBS(domainEvent: BehaviorSubject<AggregateRoot<T>>){
    this._domainBS = domainEvent;
  }

  protected addDomainEvent (domainEvent: any){
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForBS(this);
    this.logDomainEventAdded(domainEvent);
  }

  private logDomainEventAdded (domainEvent: any){
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    if (thisClass) {
      console.log('[Domain Event Created]: ', thisClass.constructor.name);
    } else {
      console.log('[Domain Event Created]: Unknown Class');
    }

  }

  protected dispatchObserver(domainPipe: UnaryFunction<any, any>){
    DomainEvents.dispatch(this, ActionEvents.Observable,domainPipe);
  }

  protected dispatchBS(){
    DomainEvents.dispatch(this, ActionEvents.BehaviorSubject);
  }

}
