import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretsComponent } from './secrets/secrets.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: '', component: SecretsComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
