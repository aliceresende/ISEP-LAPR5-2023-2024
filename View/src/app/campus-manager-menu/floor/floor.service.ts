import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Floor } from './floor';
import { map } from 'rxjs/operators';
import {Building} from "../building/building";



@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private httpClient: HttpClient) { }
  private responseBack(res: Response) {
    return res || {};
  }
  getApiUrl(): string {
    return this.apiUrl;
  }

  getFloorsList() {
    const url = 'http://localhost:3000/api/floors/listFloors';//`${this.apiUrl}/listFloors`;
    return this.httpClient.get<any>(url);
  }

  getFloorsByBuilding(idBuilding: string) {
    const url = `${this.apiUrl}/listFloors/${idBuilding}`;
    return this.httpClient.get<any>(url);
  }

  getMinMaxFloorBuildings(min: string, max: string): Observable<[Building]> {
    const url = `${this.apiUrl}/listFloors/${min}/${max}`;
    return this.httpClient.get<[Building]>(url);
  }


  createFloor(floorNumber: string, description: string, floorBuilding: string){
    let floorData= {
      floorNumber:floorNumber,
      description:description,
      floorBuilding:floorBuilding
      };
      return this.httpClient.post(this.apiUrl, floorData);//, { responseType: 'json' });

  }

  updateFloor(id: string, floorNumber: string, description: string){
    let floorData= {
      id: id,
      floorNumber:floorNumber,
      description:description,
      };
      console.log("Floor Data Service:", floorData);
      return this.httpClient.patch(this.apiUrl, floorData);//, { responseType: 'json' });

  }


}
