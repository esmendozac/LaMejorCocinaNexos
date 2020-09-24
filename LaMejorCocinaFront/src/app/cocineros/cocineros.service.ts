import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cocinero } from '../interfaces/cocinero';

@Injectable({
  providedIn: 'root'
})
export class CocinerosService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los cocineros existentes
   */
  getCocineros () : Observable<Cocinero[]>{

    return this.http.get<Cocinero[]>(this.urlApi + "cocineros")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * 
   * @param id Consulta un cocinero segun su id 
   */
  getCocinero (id : number) : Observable<Cocinero>{

    return this.http.get<Cocinero>(this.urlApi + "cocineros/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Crea un cocinero en la base de datos
   * @param cocinero 
   */
  postCocinero (cocinero : Cocinero) : any {

    return this.http.post(this.urlApi + "cocineros/" , cocinero)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Edita un cocinero en la base de datos
   * @param id 
   * @param cocinero 
   */
  putCocinero (id : number, cocinero : Cocinero) : any {

    return this.http.put(this.urlApi + "cocineros/" + id , cocinero)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Elimina un cocinero de la base de datos
   * @param id 
   */
  deleteCocinero (id : number) : any {

    return this.http.delete(this.urlApi + "cocineros/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * 
   * @param error Muestra el error obtenido el request
   */
  errorHandler (error : HttpErrorResponse) {
    console.log("Error : ", error.message);
    return throwError(error.message);
  }
  
}