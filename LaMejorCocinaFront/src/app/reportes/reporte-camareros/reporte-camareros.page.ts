import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../reportes-service.service';
import { CamareroDto } from '../../interfaces/camarero-dto';
import { MesDto } from '../../interfaces/mes-dto';

@Component({
  selector: 'app-reporte-camareros',
  templateUrl: './reporte-camareros.page.html',
  styleUrls: ['./reporte-camareros.page.scss'],
})
export class ReporteCamarerosPage implements OnInit {

  constructor(private reportesService : ReportesService) { }

  meses : MesDto[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.reportesService.getReporteCamareros().subscribe(data => { this.meses = data, console.log("meses", data)});

  }
}