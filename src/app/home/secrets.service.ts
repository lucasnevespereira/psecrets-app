import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SecretResponse {
  id: string,
  createdAt: string,
  content: string,
  creator: string
}

@Injectable({
  providedIn: 'root'
})
export class SecretsService {
  date = new Date(Date.now());
  rootUrl: string = "http://localhost:3000/api/secret"

  constructor(private http: HttpClient) { }

  createSecret(content: string) {
    this.http.post(`${this.rootUrl}`, {content: content, createdAt: this.date }).subscribe(res => {
      console.log(res);
    })
  }

  getAllSecrets() {
    return this.http.get<SecretResponse[]>(this.rootUrl);
  }

  getSecretById(userId: string) {
    return this.http.get<any[]>(`${this.rootUrl}/userSecrets/${userId}`);
  }

  deleteSecret(secretId: string) {
    return this.http.delete(`${this.rootUrl}/${secretId}`);
  }

  deleteUserSecrets(userId: string) {
    return this.http.delete(`${this.rootUrl}/userSecrets/${userId}`).subscribe(res => console.log(res));
  }


}
