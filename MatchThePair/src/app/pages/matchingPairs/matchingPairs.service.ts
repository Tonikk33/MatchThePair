import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MatchingPairsService {
  constructor(private http: HttpClient) {
  }
  getData() {
    console.log('service')
    return this.http.get('https://www.xe.com/api/popular-pairs/?from=USD');
  }

}
