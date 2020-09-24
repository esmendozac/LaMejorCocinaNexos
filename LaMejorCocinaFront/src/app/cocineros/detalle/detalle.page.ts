import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Modos } from '../../modos.enum';
import { Cocinero } from '../../interfaces/cocinero';
import { CocinerosService } from '../cocineros.service';
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

  constructor(private cocinerosService :CocinerosService,
              private activatedRoute : ActivatedRoute,
              private router : Router, 
              private alertController: AlertController,
              private toastController: ToastController) { }

  //Crea el formulario del cocinero
  cocineroForm = new FormGroup({
    Nombres            : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido1          : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido2          : new FormControl('', [Validators.maxLength(200)]),    
    IdCocinero          : new FormControl(0)   

  });


  //Define si la pagina se carga para creación o edición
  modo : Modos;

  ngOnInit() {
    /**Obtiene los parametros desde la ruta */
    //this.idCocinero  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cocineroForm.controls["IdCocinero"].setValue(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.modo = this.establecerModo(this.cocineroForm.controls["IdCocinero"].value);
    
    //En modo edición realiza la consulta del cocinero
    if(this.modo == Modos.edicion){      
      this.cocinerosService.getCocinero(this.cocineroForm.controls["IdCocinero"].value).subscribe(data => {
       
        //Carga el formulario con los valores consultados
        this.cocineroForm.controls["Nombres"].setValue(data.Nombres);
        this.cocineroForm.controls["Apellido1"].setValue(data.Apellido1);
        this.cocineroForm.controls["Apellido2"].setValue(data.Apellido2);

      }, error => console.log(error));
    }
  }

  enviarForm():void{
    console.log("Form", this.cocineroForm.value);    

    //Crear
    if(this.cocineroForm.controls["IdCocinero"].value == 0)
    {
      this.cocinerosService.postCocinero(this.cocineroForm.value).subscribe(data => {
        
        this.mostrarToast("creado");

        //Retorna a la vista de cocineros
        this.router.navigate(['/cocineros']);
      }, error => {
        console.log("Error", error);
      });
    }
    //Editar
    else {
      
      this.cocinerosService.putCocinero(this.cocineroForm.controls["IdCocinero"].value, this.cocineroForm.value).subscribe(data => {
        
        this.mostrarToast("editado");

        //Retorna a la vista de cocineros
        this.router.navigate(['/cocineros']);
      }, error => {
        console.log("Error", error);
      });
    }
  }

  /**
   * Establece el modo de configuracion del componente : [edicion, creacion] 
   * @param id 
   */
  establecerModo(idCocinero: number):Modos{

    if(idCocinero === 0)
      return Modos.creacion
    else 
      return Modos.edicion 
  }

  /** 
   * Elimina el cocinero actual
  */
  eliminarCocinero(): void{
    this.cocinerosService.deleteCocinero(this.cocineroForm.controls["IdCocinero"].value).subscribe(data => {
      //Retorna a la vista de cocineros
      this.router.navigate(['/cocineros']);

    }, error => console.log(error));
  }

  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el cocinero?',
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
            this.eliminarCocinero();
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
      message: 'El cocinero ' + this.cocineroForm.controls["Apellido1"].value + " " + this.cocineroForm.controls["Nombres"].value + " ha sido "+ accion +" correctamente",
      duration: 2000
    });
    toast.present();
  }
}
