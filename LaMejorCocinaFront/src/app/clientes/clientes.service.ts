import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los clientes existentes
   */
  getClientes () : Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.urlApi + "clientes")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * 
   * @param id Consulta un cliente segun su id 
   */
  getCliente (id : number) : Observable<Cliente>{

    return this.http.get<Cliente>(this.urlApi + "clientes/" + id)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Crea un cliente en la base de datos
   * @param cliente 
   */
  postCliente (cliente : Cliente) : any {

    return this.http.post(this.urlApi + "clientes/" , cliente)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Edita un cliente en la base de datos
   * @param id 
   * @param cliente 
   */
  putCliente (id : number, cliente : Cliente) : any {

    return this.http.put(this.urlApi + "clientes/" + id , cliente)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Elimina un cliente de la base de datos
   * @param id 
   */
  deleteCliente (id : number) : any {

    return this.http.delete(this.urlApi + "clientes/" + id)
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
