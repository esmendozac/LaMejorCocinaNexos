import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CamareroDto } from '../interfaces/camarero-dto';
import { ClienteDto } from '../interfaces/cliente-dto';
import { MesDto } from '../interfaces/mes-dto';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  urlApi : string = "http://localhost:51924/api/";

  constructor(private http : HttpClient) { }

  /**
   * Consulta todos los clientes que gastaron mas de $100000
   */
  getReporteClientes () : Observable<ClienteDto[]>{

    return this.http.get<ClienteDto[]>(this.urlApi + "reportes/clientes")
    .pipe(catchError(this.errorHandler));
    
  }

  /**
   * Consulta todos los meses con el dinero que facturó cada camarero
   */
  getReporteCamareros () : Observable<MesDto[]>{

    return this.http.get<MesDto[]>(this.urlApi + "reportes/camareros")
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
