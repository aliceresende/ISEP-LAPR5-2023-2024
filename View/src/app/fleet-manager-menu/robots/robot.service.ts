import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Robot } from './robot';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  //private apiUrl = 'https://robdronego63.azurewebsites.net/api/robots'; // Replace with your actual API URL
  private apiUrl = 'http://localhost:3000/api/robots'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return this.apiUrl;
  }

  getRobotsList() {
    const url = `${this.apiUrl}/listRobots`;
    return this.http.get<any>(url);
  }

  createRobots(code: string, nickname: string, seriesNumber: string,robotType:string,description:string,status:boolean){
    const robotData = {
      code:code,
      nickname:nickname,
      seriesNumber:seriesNumber,
      robotType:robotType,
      description:description,
      status:status
    };
    return this.http.post(this.apiUrl, robotData);
  }

  updateRobots(robotId: string){
    const url = `${this.apiUrl}/state`;
    const robotData = {
        id:robotId
    };
    return this.http.patch(url, robotData);
  }
  getRobotsTypeList(){
    //const url='https://robdronego63.azurewebsites.net/api/robotTypes/listRobots';
    const url='http://localhost:3000/api/robotTypes/listRobots';

    return this.http.get<any>(url);
    
  }
}
