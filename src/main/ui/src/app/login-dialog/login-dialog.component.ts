import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginCredentials } from '../types/types';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
  ) {}

  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit() {
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}
