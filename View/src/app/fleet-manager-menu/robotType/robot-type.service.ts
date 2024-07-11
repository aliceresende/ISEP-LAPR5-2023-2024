import { Injectable } from '@angular/core';
import { RobotType } from './robotType';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {
  //apiURL = 'https://robdronego63.azurewebsites.net/api/robotTypes';
  apiURL = 'http://localhost:3000/api/robotTypes';

  constructor(private httpClient: HttpClient) { }

  getApiUrl(): string {
    return this.apiURL;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  create(robotType: string, brand:string, model: string, typeOfTasks: string[]): Observable<any> {
    const robotTypeData: any = {
      robotType: robotType,
      brand: brand,
      model: model,
      typeOfTasks: typeOfTasks
    };

    return this.httpClient.post(this.apiURL, robotTypeData);
  }
  getPickDeliveryRobots() {
    const url = `${this.apiURL}/listRobots/pickUpDelivery`;
    return this.httpClient.get<any>(url);
  }
  getVigilanceRobots() {
    const url = `${this.apiURL}/listRobots/vigilancia`;
    return this.httpClient.get<any>(url);
  }
}
