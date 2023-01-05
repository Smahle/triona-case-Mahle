import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonFormModule } from 'src/app/person-form/person-form.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatNativeDateModule,
    PersonFormModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule { }
