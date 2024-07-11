import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Building } from './building';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {

items: Building[] = [];


  // Use environment-specific API URL
  //apiURL = 'https://robdronego63.azurewebsites.net/api/buildings';
   apiURL = 'http://localhost:3000/api/buildings';

  constructor(private http: HttpClient) { }
  getApiUrl(): string {
    return this.apiURL;
  }
  // HttpClient API post() method => Create building
  createBuilding(building: Building): Observable<Building> {
    console.log(building);
    return this.http.post<Building>(this.apiURL, building);
  }

  clearForm() {
    this.items = [];
    return this.items;
  }

  getBuildingsList() {
    const url = this.apiURL+'/listBuildings';
    return this.http.get<any>(url);
  }

  updateBuilding(id: string, name: string, code: string, description: string, x: number, y: number){
    let buildingData= {
      id: id,
      name:name,
      code:code,
      description:description,
      x:x,
      y:y,
      };
      console.log("building Data Service:", buildingData);
      return this.http.patch(this.apiURL, buildingData);//, { responseType: 'json' });

  }
}