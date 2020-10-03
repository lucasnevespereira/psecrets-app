import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userId : string;

  constructor(private menu: MenuController, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    this.menu.close();
    this.userId = this.authService.getUserId();
  }


  onDeleteAccount(userId: string) {
    this.authService.deleteUser(userId);
  }

  async presentAlertConfirm(userId : string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Delete Confirmation',
      message: 'Are you sure you want delete your account ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.onDeleteAccount(userId);
          }
        }
      ]
    });

    await alert.present();
  }

}
