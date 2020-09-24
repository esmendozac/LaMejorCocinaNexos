import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mesa } from '../interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los mesas existentes
   */
  getMesas () : Observable<Mesa[]>{

    return this.http.get<Mesa[]>(this.urlApi + "mesas")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * 
   * @param id Consulta un mesa segun su id 
   */
  getMesa (id : number) : Observable<Mesa>{

    return this.http.get<Mesa>(this.urlApi + "mesas/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Crea un mesa en la base de datos
   * @param mesa 
   */
  postMesa (mesa : Mesa) : any {

    return this.http.post(this.urlApi + "mesas/" , mesa)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Edita un mesa en la base de datos
   * @param id 
   * @param mesa 
   */
  putMesa (id : number, mesa : Mesa) : any {

    return this.http.put(this.urlApi + "mesas/" + id , mesa)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Elimina un mesa de la base de datos
   * @param id 
   */
  deleteMesa (id : number) : any {

    return this.http.delete(this.urlApi + "mesas/" + id)
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
