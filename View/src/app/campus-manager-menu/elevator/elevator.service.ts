import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elevator } from "./elevator";

@Injectable({
  providedIn: 'root',
})
export class ElevatorService {

  // Define API
  apiURL = 'https://robdronego63.azurewebsites.net/api/elevators';

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return this.apiURL;
  }

  create(building: string, floors: String[], brand: string, model: string, seriesNumber: string, description: string, x: string, y: string, location: string): Observable<any> {
    let elevatorData = {
      building: building,
      floors: floors,
      brand: brand,
      model: model,
      seriesNumber: seriesNumber,
      description: description,
      x: x,
      y: y,
      location: location
    };

    return this.http.post(this.apiURL, elevatorData);
  }

  update(id:string, building: string, floors: String[], brand: string, model: string, seriesNumber: string, description: string, x: string, y: string, location: string): Observable<any> {
    let elevatorData = {
      id: id,
      building: building,
      floors: floors,
      brand: brand,
      model: model,
      seriesNumber: seriesNumber,
      description: description,
      x: x,
      y: y,
      location: location
    };

    return this.http.patch(this.apiURL, elevatorData);
  }

  getAllElevators(): Observable<any>{
    return this.http.get<any>(this.apiURL+'/allElevators');
  }

  // HttpClient API get() method => List all elevators from a building
  getElevators(id: any): Observable<Elevator[]> {
    return this.http.get<Elevator[]>(this.apiURL + '/listElevators/' + id);
  }
}
