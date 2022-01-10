import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class appService {
  constructor(private http: HttpClient) {
  }
  getData() {
   return  this.http.get('assets/text.txt', {responseType: 'text'})
  }

}
