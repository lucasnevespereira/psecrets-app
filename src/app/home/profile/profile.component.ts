import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { SecretsService } from '../secrets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId : string;
  secrets = []

  constructor(private alertController: AlertController ,private menu: MenuController, private authService: AuthService, private secretService: SecretsService) {
    console.log(`User: ${this.authService.getUserId()}`);
  }

  ngOnInit() {
    this.menu.close();
    this.userId = this.authService.getUserId();
    this.secretService.getSecretById(this.userId).subscribe((res) => {
      this.secrets = res["secrets"]
      console.log(this.secrets);
    })
  }


  async presentAlertConfirm(secretId : string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Delete Confirmation',
      message: 'Are you sure you want delete this secret ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Yes',
          handler: () => {
        
          }
        }
      ]
    });

    await alert.present();
  }



}
