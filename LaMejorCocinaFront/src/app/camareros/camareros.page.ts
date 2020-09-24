import { Component, OnInit } from '@angular/core';
import { Camarero } from '../interfaces/camarero';
import { CamarerosService } from './camareros.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-camareros',
  templateUrl: './camareros.page.html',
  styleUrls: ['./camareros.page.scss'],
})
export class CamarerosPage implements OnInit	 {

  constructor(private camarerosService :CamarerosService, private router : Router) { }

  camareros : Camarero[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.camarerosService.getCamareros().subscribe(data => {this.camareros = data, console.log("Camareros", data)});

  }

  /**
   * Redirecciona la ruta a la vista de creación de un nuevo camarero
   */
  onCrearCamarero():void{
    this.router.navigate(['/camareros',0]);
  }
}

