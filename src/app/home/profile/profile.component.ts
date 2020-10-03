import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  constructor(private menu: MenuController, private authService: AuthService, private secretService: SecretsService) {
    console.log(`User: ${this.authService.getUserId()}`);
  }

  ngOnInit() {
    this.menu.close();
    this.userId = this.authService.getUserId();
    // this.secretService.getAllSecrets().pipe(
    //   map(s => s.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) ),
    // ).subscribe((res) => {
    //   this.secrets = res;
    //   console.log(`FEEED SECRETS: ${this.secrets}`);
    // })

    this.secretService.getSecretById(this.userId).subscribe((res) => {
      this.secrets = res["secrets"]
      console.log(this.secrets);
    })
  }




}
