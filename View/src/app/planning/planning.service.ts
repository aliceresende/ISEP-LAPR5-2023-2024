import { Injectable } from "@angular/core";
import { MessageService } from "../message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class PlaningService{
  
    item: string | undefined;
    apiURL = 'http://localhost:3000/api/planning';
    constructor(private http: HttpClient,
                private messageService: MessageService) { }
    /*========================================
     CRUD Methods for consuming RESTful API
   =========================================*/
  
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  
    // HttpClient API get() method => Fetch deliveries list
    getPlanning(){
      return this.http.get<Content>(this.apiURL).pipe(retry(1),catchError(this.handleError));
    }
  
    // Error handling
    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
  }
  