import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SecretResponse {
  id: string,
  content: string,
  creator: string
}

@Injectable({
  providedIn: 'root'
})
export class SecretsService {

  rootUrl: string = "http://localhost:3000/api/secret"

  constructor(private http: HttpClient) { }

  createSecret(content: string) {
    this.http.post(`${this.rootUrl}`, {content: content}).subscribe(res => {
      console.log(res);
    })
  }

  getAllSecrets() {
    return this.http.get<SecretResponse[]>(this.rootUrl);
  }
}