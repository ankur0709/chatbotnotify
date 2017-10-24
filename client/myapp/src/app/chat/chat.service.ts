import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/' + room)
        .map(res => res.json())
        .subscribe(res => {
          console.log('hey', res)
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post('http://localhost:3000', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
