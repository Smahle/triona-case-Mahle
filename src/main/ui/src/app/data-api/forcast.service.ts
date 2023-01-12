import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForcastService {

  constructor(private http: HttpClient) { }

  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?zip="+zip+",us&APPID=dabc2b57d81c4493c08ab63bb4d9e326&units=imperial" );
  }

  LoadCurrentWeather(): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?lat=62.90&lon=6.91&appid=0b9161dba2376f1290bdd8f47193ca53");
  }
}
