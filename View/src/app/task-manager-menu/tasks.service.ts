import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PickUpDelivery } from '../user-menu/pickUpDelivery';
import { Vigilance } from '../user-menu/vigilance';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  getPUDTaskByEmail(email: string): Observable<PickUpDelivery[]>{
    console.log(email)
    return this.http.get<PickUpDelivery[]>(
      `http://localhost:5057/api/PickUpDeliver/user/${email}`,
        {observe: 'body', responseType: 'json'}
    );
}

getVigilanceTaskByEmail(email: string): Observable<Vigilance[]>{
  return this.http.get<Vigilance[]>(
      `http://localhost:5057/api/Vigilance/user/${email}`,
      {observe: 'body', responseType: 'json'}
  );
}

  listWaitingPUDRequests(): Observable<PickUpDelivery[]>{
    return this.http.get<PickUpDelivery[]>(
        "http://localhost:5057/api/PickUpDeliver/waiting",
        {observe: 'body', responseType: 'json'}
    );
}
getPUDTaskByRobot(robotId: string): Observable<PickUpDelivery[]>{
  return this.http.get<PickUpDelivery[]>(
    `http://localhost:5057/api/PickUpDeliver/robot/${robotId}`,
    {observe: 'body', responseType: 'json'}
);
}

getVigilanceTaskByRobot(robotId: string): Observable<Vigilance[]>{
  return this.http.get<Vigilance[]>(
    `http://localhost:5057/api/Vigilance/robot/${robotId}`,
    {observe: 'body', responseType: 'json'}
);
}
listWaitingVigilanceRequests(): Observable<Vigilance[]>{
  return this.http.get<Vigilance[]>(
      "http://localhost:5057/api/Vigilance/waiting",
      {observe: 'body', responseType: 'json'}
  );
}
approveOrRefusePickUpDelivery(requestId: string, status: boolean, robotId: string) {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  const statusStr = status ? 'true' : 'false';
  const robotIdParam = robotId || "";
  if(robotId===""){
    const url = `http://localhost:5057/api/PickUpDeliver/${requestId}/${statusStr}/""`;
    return this.http.patch<PickUpDelivery>(url, {}, httpOptions);
  }else{
    const url = `http://localhost:5057/api/PickUpDeliver/${requestId}/${statusStr}/${robotIdParam}`;
  return this.http.patch<PickUpDelivery>(url, {}, httpOptions);

  }
}

  approveOrRefuseVigilance(requestId: string, status: boolean,robotId:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const statusStr = status ? 'true' : 'false';
    const robotIdParam = robotId || "";
    if(robotId===""){
      const url = `http://localhost:5057/api/Vigilance/${requestId}/${statusStr}/""`;
      return this.http.patch<Vigilance>(url, {}, httpOptions);
    }else{
      const url = `http://localhost:5057/api/Vigilance/${requestId}/${statusStr}/${robotIdParam}`;
    return this.http.patch<Vigilance>(url, {}, httpOptions);
  
    }
  }
}
