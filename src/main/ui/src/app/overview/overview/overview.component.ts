import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/data-api/app.service';
import { SharedService } from 'src/app/shared-service/shared.service';
import { UserInfoDto } from 'src/app/types/types';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnChanges {
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

  users: UserInfoDto[] = [];
  userCount = 0;
  numberOfLeapyears = 0;
  averageLengthOfFirstName = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private appService: AppService, private sharedService: SharedService) {}

  ngOnInit() {
    this.getAllUsers();
    this.sharedService.changeEmitted$.subscribe(()=>{
      this.getAllUsers();
    })
  }

  getAllUsers() {
    this.appService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: UserInfoDto[]) => {
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

  averageLengthFirstName() {
    let averageLength = 0;
    this.users.forEach((element) => {
      averageLength += element.firstName.length;
    });
    this.averageLengthOfFirstName = averageLength / this.userCount;
  }

  ngOnChanges() {
    this.getAllUsers();
}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
