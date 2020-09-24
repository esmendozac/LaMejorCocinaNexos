import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Modos } from '../../modos.enum';
import { Mesa } from '../../interfaces/mesa';
import { MesasService } from '../mesas.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import{ FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  constructor(private mesasService :MesasService,
              private activatedRoute : ActivatedRoute,
              private router : Router, 
              private alertController: AlertController,
              private toastController: ToastController) { }

  //Crea el formulario del mesa
  mesaForm = new FormGroup({   
    NumMaxComensales   : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Ubicacion          : new FormControl('', [Validators.maxLength(1000)]),   
    IdMesa             : new FormControl(0)   
  });

  //idMesa : number= 0;

  //Define si la pagina se carga para creación o edición
  modo : Modos;

  ngOnInit() {
    /**Obtiene los parametros desde la ruta */
    //this.idMesa  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mesaForm.controls["IdMesa"].setValue(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.modo = this.establecerModo(this.mesaForm.controls["IdMesa"].value);
    
    //En modo edición realiza la consulta del mesa
    if(this.modo == Modos.edicion){      
      this.mesasService.getMesa(this.mesaForm.controls["IdMesa"].value).subscribe(data => {
       
        //Carga el formulario con los valores consultados
        this.mesaForm.controls["NumMaxComensales"].setValue(data.NumMaxComensales);
        this.mesaForm.controls["Ubicacion"].setValue(data.Ubicacion);

      }, error => console.log(error));
    }
  }

  enviarForm():void{
    console.log("Form", this.mesaForm.value);    

    //Crear
    if(this.mesaForm.controls["IdMesa"].value == 0)
    {
      this.mesasService.postMesa(this.mesaForm.value).subscribe(data => {
        
        this.mostrarToast("creado");

        //Retorna a la vista de mesas
        this.router.navigate(['/mesas']);
      }, error => {
        console.log("Error", error);
      });
    }
    //Editar
    else {
      
      this.mesasService.putMesa(this.mesaForm.controls["IdMesa"].value, this.mesaForm.value).subscribe(data => {
        
        this.mostrarToast("editado");

        //Retorna a la vista de mesas
        this.router.navigate(['/mesas']);
      }, error => {
        console.log("Error", error);
      });
    }
  }

  /**
   * Establece el modo de configuracion del componente : [edicion, creacion] 
   * @param id 
   */
  establecerModo(idMesa: number):Modos{

    if(idMesa === 0)
      return Modos.creacion
    else 
      return Modos.edicion 
  }

  /** 
   * Elimina el mesa actual
  */
  eliminarMesa(): void{
    this.mesasService.deleteMesa(this.mesaForm.controls["IdMesa"].value).subscribe(data => {
      //Retorna a la vista de mesas
      this.router.navigate(['/mesas']);

    }, error => console.log(error));
  }

  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el mesa?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',         
          handler: (h) => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.eliminarMesa();
            this.mostrarToast("eliminado");
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Muestra mensaje de confirmación de eliminación de usuario
   */
  async mostrarToast(accion : string) {

    const toast = await this.toastController.create({
      message: 'La mesa ' + this.mesaForm.controls["Ubicacion"].value + " ha sido "+ accion +" correctamente",
      duration: 2000
    });
    toast.present();
  }

  


}
