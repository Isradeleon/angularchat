import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private serverUrl: string = 'http://localhost:3333/';

  constructor(private http: HttpClient) { }

  getRequest(url: string): Observable<any>{
    return this.http.get<any>(this.serverUrl+url);
  }

  postRequest(url: string, data: Object): Observable<any>{
    return this.http.post(this.serverUrl+url, data);
  }
}
