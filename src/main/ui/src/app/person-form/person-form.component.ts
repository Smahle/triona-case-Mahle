import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../data-api/app.service';
import { UserInfoDto } from '../types/types';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit{
  userCount = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() newItemEvent = new EventEmitter<void>();

    //TODO: add validators
  personForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    adress: new FormControl(),
    birthDate: new FormControl(),
    phoneNumber: new FormControl(),
  });

  constructor(private appService: AppService) {}

  ngOnInit(){
    this.getAllUsers();
  }

  onSendInformation() {
    this.getAllUsers();
    this.appService
      .addUser(this.personForm.value, this.userCount + 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.newItemEvent.emit();
        this.personForm.reset();
      });
  }
  getAllUsers() {
    this.appService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: UserInfoDto[]) => {
        if (users.length != 0) {
          this.userCount = users.length;
        }
      });

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
