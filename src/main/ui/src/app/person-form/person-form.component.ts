import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ControlValueAccessor,
  Validators,
  NgForm,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../data-api/app.service';

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  adress: string;
  birthDate: Date;
  phoneNumber: number;
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'reversed',
    'lastName',
    'adress',
    'birthDate',
    'leapYear',
    'phoneNumber',
    'sum',
  ];

  users: UserInfo[] = [];
  userCount = 0;
  numberOfLeapyears = 0;
  averageLengthOfFirstName = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  personForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    adress: new FormControl(),
    birthDate: new FormControl(),
    phoneNumber: new FormControl(),
  });

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  onSendInformation() {
    this.appService
      .addUser(this.personForm.value, this.userCount + 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userCount = this.userCount + 1;
        this.personForm.reset();
        this.getAllUsers();
      });
  }

  getAllUsers() {
    this.appService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: UserInfo[]) => {
        if (users.length != 0) {
          let totalLeapyears = 0;
          this.userCount = users.length;
          const usersWithReversed = users.map((obj) => ({
            ...obj,
            reversed: this.reverseString(obj.firstName),
          }));
          const usersWithSum = usersWithReversed.map((obj) => ({
            ...obj,
            sum: this.sumPhoneNumber(obj.phoneNumber),
          }));
          const leapYears = usersWithSum.map((obj) => ({
            ...obj,
            leapYear: this.checkLeapYear(obj.birthDate),
          }));
          this.users = leapYears;
          this.averageLengthFirstName();
          users.forEach((element) => {
            if (this.checkLeapYear(element.birthDate) == true) {
              totalLeapyears = totalLeapyears + 1;
            }
          });
          this.numberOfLeapyears = totalLeapyears;
        }
      });
  }

  reverseString(str: string) {
    var splitString = str.split('');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join('');
    return joinArray;
  }

  sumPhoneNumber(value: number) {
    let sum = 0;
    while (value) {
      sum += value % 10;
      value = Math.floor(value / 10);
    }
    return sum;
  }

  checkLeapYear(datestamp: Date): boolean {
    const year1 = new Date(datestamp);
    const year = year1.getFullYear();
    const leap = new Date(year, 1, 29).getDate() === 29;
    if (leap) {
      return true;
    } else {
      return false;
    }
  }

  averageLengthFirstName(){
    let averageLength = 0;
    this.users.forEach(element => {
      averageLength+=element.firstName.length;
    });
    this.averageLengthOfFirstName=averageLength/this.userCount;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
export class TableBasicExample {}
