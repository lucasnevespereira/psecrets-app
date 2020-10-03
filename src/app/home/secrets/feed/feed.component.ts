import { Component, OnInit } from '@angular/core';
import { SecretsService } from '../../secrets.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  secrets = []

  constructor(private secretService: SecretsService) {
    this.secretService.getAllSecrets().pipe(
      map(s => s.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) ),
    ).subscribe((res) => {
      console.log(res);
      this.secrets = res;
      console.log(`FEEED SECRETS: ${this.secrets}`);
    })
  }

  ngOnInit() {
  }

}
