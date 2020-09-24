import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Camarero } from '../interfaces/camarero';

@Injectable({
  providedIn: 'root'
})
export class CamarerosService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los camareros existentes
   */
  getCamareros () : Observable<Camarero[]>{

    return this.http.get<Camarero[]>(this.urlApi + "camareros")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * 
   * @param id Consulta un camarero segun su id 
   */
  getCamarero (id : number) : Observable<Camarero>{

    return this.http.get<Camarero>(this.urlApi + "camareros/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Crea un camarero en la base de datos
   * @param camarero 
   */
  postCamarero (camarero : Camarero) : any {

    return this.http.post(this.urlApi + "camareros/" , camarero)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Edita un camarero en la base de datos
   * @param id 
   * @param camarero 
   */
  putCamarero (id : number, camarero : Camarero) : any {

    return this.http.put(this.urlApi + "camareros/" + id , camarero)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Elimina un camarero de la base de datos
   * @param id 
   */
  deleteCamarero (id : number) : any {

    return this.http.delete(this.urlApi + "camareros/" + id)
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