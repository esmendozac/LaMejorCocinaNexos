import { Component, OnInit } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { FacturasService } from './facturas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit	 {

  constructor(private facturasService :FacturasService, private router : Router) { }

  facturas : Factura[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.facturasService.getFacturas().subscribe(data => {this.facturas = data, console.log("Facturas", data)});

  }

  /**
   * Redirecciona la ruta a la vista de creación de un nuevo factura
   */
  onCrearFactura():void{
    this.router.navigate(['/facturas',0]);
  }
}
