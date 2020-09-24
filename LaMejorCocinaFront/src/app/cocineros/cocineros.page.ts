import { Component, OnInit } from '@angular/core';
import { Cocinero } from '../interfaces/cocinero';
import { CocinerosService } from './cocineros.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cocineros',
  templateUrl: './cocineros.page.html',
  styleUrls: ['./cocineros.page.scss'],
})
export class CocinerosPage implements OnInit	 {

  constructor(private cocinerosService :CocinerosService, private router : Router) { }

  cocineros : Cocinero[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.cocinerosService.getCocineros().subscribe(data => {this.cocineros = data, console.log("Cocineros", data)});

  }

  /**
   * Redirecciona la ruta a la vista de creación de un nuevo cocinero
   */
  onCrearCocinero():void{
    this.router.navigate(['/cocineros',0]);
  }
}
