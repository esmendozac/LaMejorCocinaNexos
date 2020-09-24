import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los facturas existentes
   */
  getFacturas () : Observable<Factura[]>{

    return this.http.get<Factura[]>(this.urlApi + "facturas")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * 
   * @param id Consulta un factura segun su id 
   */
  getFactura (id : number) : Observable<Factura>{

    return this.http.get<Factura>(this.urlApi + "facturas/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Crea un factura en la base de datos
   * @param factura 
   */
  postFactura (factura : Factura) : any {

    return this.http.post(this.urlApi + "facturas/" , factura)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Edita un factura en la base de datos
   * @param id 
   * @param factura 
   */
  putFactura (id : number, factura : Factura) : any {

    return this.http.put(this.urlApi + "facturas/" + id , factura)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Elimina un factura de la base de datos
   * @param id 
   */
  deleteFactura (id : number) : any {

    return this.http.delete(this.urlApi + "facturas/" + id)
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
