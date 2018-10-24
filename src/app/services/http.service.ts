import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CookiesService} from './cookies.service';
import {RequestOptions} from '@angular/http';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:1337';

  httpOptions = {
    headers: this.headers()
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookiesService) {}

  public post(url: string, item: any): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/${url}`, item, this.httpOptions);
  }

  public update(url: string, id: string, item: any): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/${url}/${id}`, item, this.httpOptions);
  }

  read(url: string, id: string): Observable<any> {
    return this.httpClient
     .get(`${this.baseUrl}/${url}/${id}`, this.httpOptions);
  }

  list(url: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/${url}`, this.httpOptions);
  }

  delete(url: string, id: number) {
    return this.httpClient
      .delete(`${this.baseUrl}/${url}/${id}`, this.httpOptions);
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const bearer = this.cookieService.getCookie(this.cookieService.jwtKey);
    if (bearer !== '') {
      headers = headers.append('Authorization', `Bearer ${bearer}`);
    }
    console.log(headers);
    return headers;
  }
}
