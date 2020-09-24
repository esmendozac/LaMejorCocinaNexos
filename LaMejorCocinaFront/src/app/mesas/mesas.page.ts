import { Component, OnInit } from '@angular/core';
import { Mesa } from '../interfaces/mesa';
import { MesasService } from './mesas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit	 {

  constructor(private mesasService :MesasService, private router : Router) { }

  mesas : Mesa[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.mesasService.getMesas().subscribe(data => {this.mesas = data, console.log("Mesas", data)});

  }

  /**
   * Redirecciona la ruta a la vista de creación de un nuevo mesa
   */
  onCrearMesa():void{
    this.router.navigate(['/mesas',0]);
  }
}
