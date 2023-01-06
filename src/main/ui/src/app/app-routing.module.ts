import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: 'brukere', component: OverviewComponent },
  { path: 'registrering', component: PersonFormComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
