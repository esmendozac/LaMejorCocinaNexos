import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Modos } from '../../modos.enum';
import { Camarero } from '../../interfaces/camarero';
import { CamarerosService } from '../camareros.service';
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

  constructor(private camarerosService :CamarerosService,
              private activatedRoute : ActivatedRoute,
              private router : Router, 
              private alertController: AlertController,
              private toastController: ToastController) { }

  //Crea el formulario del camarero
  camareroForm = new FormGroup({
    Nombres            : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido1          : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido2          : new FormControl('', [Validators.maxLength(200)]),    
    IdCamarero         : new FormControl(0)   

  });

  //idCamarero : number= 0;

  //Define si la pagina se carga para creación o edición
  modo : Modos;

  ngOnInit() {
    /**Obtiene los parametros desde la ruta */
    //this.idCamarero  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.camareroForm.controls["IdCamarero"].setValue(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.modo = this.establecerModo(this.camareroForm.controls["IdCamarero"].value);
    
    //En modo edición realiza la consulta del camarero
    if(this.modo == Modos.edicion){      
      this.camarerosService.getCamarero(this.camareroForm.controls["IdCamarero"].value).subscribe(data => {
       
        //Carga el formulario con los valores consultados
        this.camareroForm.controls["Nombres"].setValue(data.Nombres);
        this.camareroForm.controls["Apellido1"].setValue(data.Apellido1);
        this.camareroForm.controls["Apellido2"].setValue(data.Apellido2);

      }, error => console.log(error));
    }
  }

  enviarForm():void{
    console.log("Form", this.camareroForm.value);    

    //Crear
    if(this.camareroForm.controls["IdCamarero"].value == 0)
    {
      this.camarerosService.postCamarero(this.camareroForm.value).subscribe(data => {
        
        this.mostrarToast("creado");

        //Retorna a la vista de camareros
        this.router.navigate(['/camareros']);
      }, error => {
        console.log("Error", error);
      });
    }
    //Editar
    else {
      
      this.camarerosService.putCamarero(this.camareroForm.controls["IdCamarero"].value, this.camareroForm.value).subscribe(data => {
        
        this.mostrarToast("editado");

        //Retorna a la vista de camareros
        this.router.navigate(['/camareros']);
      }, error => {
        console.log("Error", error);
      });
    }
  }

  /**
   * Establece el modo de configuracion del componente : [edicion, creacion] 
   * @param id 
   */
  establecerModo(idCamarero: number):Modos{

    if(idCamarero === 0)
      return Modos.creacion
    else 
      return Modos.edicion 
  }

  /** 
   * Elimina el camarero actual
  */
  eliminarCamarero(): void{
    this.camarerosService.deleteCamarero(this.camareroForm.controls["IdCamarero"].value).subscribe(data => {
      //Retorna a la vista de camareros
      this.router.navigate(['/camareros']);

    }, error => console.log(error));
  }

  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el camarero?',
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
            this.eliminarCamarero();
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
      message: 'El camarero ' + this.camareroForm.controls["Apellido1"].value + " " + this.camareroForm.controls["Nombres"].value + " ha sido "+ accion +" correctamente",
      duration: 2000
    });
    toast.present();
  }

  


}
