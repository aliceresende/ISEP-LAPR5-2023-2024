import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Room} from "./room";

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  items: Room[] = [];
 

  // Define API
  apiURL = 'http://localhost:3000/api/room/';

  getApiUrl(): string {
    return this.apiURL;
  }

  constructor(private http: HttpClient) { }

  // HttpClient API post() method => Create building
  createRoom(room:Room): Observable<Room> {
    return this.http.post<Room>(this.apiURL, room);
  }

  getRoomsList() {
    const url = this.apiURL+'/listRooms';
    return this.http.get<any[]>(url);
  }
  
}
