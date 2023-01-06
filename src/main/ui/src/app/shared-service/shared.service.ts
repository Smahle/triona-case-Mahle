import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private emitChangeSource = new Subject<void>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    emitChange() {
        this.emitChangeSource.next();
    }
constructor() { }

}
