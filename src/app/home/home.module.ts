import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomeRoutingModule } from './home-routing.module';
import { SecretsComponent } from './secrets/secrets.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './secrets/feed/feed.component';
import { BoxComponent } from './secrets/box/box.component';


@NgModule({
  declarations: [SecretsComponent, SidemenuComponent, ProfileComponent, SettingsComponent, HomeComponent, FeedComponent, BoxComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class HomeModule { }
