import { Component, OnInit } from '@angular/core';
import { SecretsService } from '../../secrets.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  secrets = []

  constructor(private secretService: SecretsService) {
    this.secretService.getAllSecrets().subscribe((res) => {
      this.secrets = res;
    })
  }

  ngOnInit() {
  }

}
