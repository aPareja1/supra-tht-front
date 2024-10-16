import { Observable } from "rxjs";


export interface UseCase<EntryObject, ExitObject> {
  execute(entryObject: EntryObject): ExitObject | Promise<ExitObject> | Observable<ExitObject>;
}
