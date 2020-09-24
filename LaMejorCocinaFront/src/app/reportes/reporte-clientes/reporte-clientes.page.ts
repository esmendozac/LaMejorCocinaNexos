import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../reportes-service.service';
import { ClienteDto } from '../../interfaces/cliente-dto';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.page.html',
  styleUrls: ['./reporte-clientes.page.scss'],
})
export class ReporteClientesPage implements OnInit {

  constructor(private reportesService : ReportesService) { }

  clientes : ClienteDto[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.reportesService.getReporteClientes().subscribe(data => {this.clientes = data, console.log("Clientes", data)});

  }
}
