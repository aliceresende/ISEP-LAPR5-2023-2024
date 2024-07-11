import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PickUpDelivery } from './pickUpDelivery';
import { Vigilance } from './vigilance';
import { BuildingService } from '../campus-manager-menu/building/building.service';
import { Room } from '../campus-manager-menu/room/room';

@Injectable({
  providedIn: 'root'
})
export class CreateTasksService {
  
  
  constructor(private http:HttpClient ) {

   }

  private apiUrl = 'https://robdronego63.azurewebsites.net/api/room';

  createPUDRequests(taskRequest: PickUpDelivery): Observable<PickUpDelivery>{
    console.log("TASK REQUEST:", taskRequest);
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  return this.http.post<PickUpDelivery>(
      "http://localhost:5057/api/PickUpDeliver",
      taskRequest,
      httpOptions
  );
}
createVigilanceRequests(taskRequest: Vigilance): Observable<Vigilance>{
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
return this.http.post<Vigilance>(
    "http://localhost:5057/api/Vigilance",
    taskRequest,
    httpOptions
);
}


}
