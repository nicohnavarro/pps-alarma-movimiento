import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../classes/user.class';
import { AlertController } from '@ionic/angular';
import { IUser } from '../../interfaces/IUser';
import {UsuariosService} from '../../services/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarios: IUser[];
  listar:boolean=false;
  clave:string;
  correo:string;
  cargando:boolean;
  passwordType:string = 'password';
  eyeType:string = 'eye-off-outline';
  passwordShown:boolean = false;
  public splash = true;

  constructor(private usuariosService:UsuariosService,private router:Router,private alertControler:AlertController) {

  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 100);
  }

  ngOnInit() {
    setTimeout(() => this.splash = false, 6000);
    this.usuariosService.getUsuarios().subscribe(res =>{
      console.log('Usuarios',res);
      localStorage.setItem('usuarios',JSON.stringify(res));
    });
  }
  
  tooglePassword() {
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
      this.eyeType = 'eye-off-outline';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
      this.eyeType = 'eye-outline';
    }

  }
  onLogin(){
    this.cargando = true;
    this.usuariosService.logIn(this.correo,this.clave).subscribe( async resp =>{
      if( resp ){
        this.router.navigate(['/home']);
        this.cargando=false;
      }else{

          const alert = await this.alertControler.create({
          header:'Uops!!',
          message: 'Le erraste al correo o la clave',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            }

          ]
        });
        await alert.present();
        this.cargando=false;
      }
      this.clave = null;
      this.correo = null;
    });
  }

  listaCorreos(){
    this.listar=true;
    console.log(this.listar);
  }

  ingresoAdmin(){
    this.correo='admin@admin.com';
    this.clave= '1111';
  }
  ingresoUsuario(){
    this.correo='usuario@usuario.com';
    this.clave= '3333';
  }
  ingresoInvitado(){
    this.correo='invitado@invitado.com';
    this.clave= '2222';
  }
  ingresoTester(){
    this.correo='tester@tester.com';
    this.clave= '5555';
  }
  ingresoAnonimo(){
    this.correo='anonimo@anonimo.com';
    this.clave= '4444';
  }
}
