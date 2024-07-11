import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassageService {
  private apiUrl = 'https://robdronego63.azurewebsites.net/api/passages'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}


  getApiUrl(): string {
    return this.apiUrl;
  }

  getFloorsList(){
    const url='https://robdronego63.azurewebsites.net/api/floors/listFloors';
    return this.http.get<any>(url);
  }

  getPassageList() {
    const url = `${this.apiUrl}/listPassages`;
    return this.http.get<any>(url);
  }
  createPassage(floorBuilding1: string, floorBuilding2: string, location: string,passageCode:string){
    const passageData = {
      floorBuilding1: floorBuilding1,
      floorBuilding2: floorBuilding2,
      location: location,
      passageCode:passageCode
    };
    return this.http.post(this.apiUrl, passageData);
  }

  updatePassage(passageId: string, floorBuilding1: string, floorBuilding2: string, location: string,passageCode:string){
    const url = `${this.apiUrl}`;
    const passageData = {
      id:passageId,
      floorBuilding1: floorBuilding1,
      floorBuilding2: floorBuilding2,
      location: location,
      passageCode:passageCode
    };
    return this.http.patch(url, passageData);
  }
}
