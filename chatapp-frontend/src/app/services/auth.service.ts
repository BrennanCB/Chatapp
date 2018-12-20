import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL: string = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public registerUser(body: {[key: string]: any}): Observable<any> {
    return this.http.post(`${ BASEURL }/register`, body);
  }
}
