import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { IUser} from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuariosCollection: AngularFirestoreCollection<IUser>;
  private usuarios: Observable<IUser[]>;
  
  constructor(db:AngularFirestore) {
    this.usuariosCollection = db.collection<IUser>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data= a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getUsuarios(){
     return this.usuarios;
   }

   getUsuario(id:string){
     return this.usuariosCollection.doc<IUser>(id).valueChanges();
   }

   public logIn( correo: string, clave: string ){
     console.log('aca');
    return this.getUsuarios().pipe( map((resp:any) => this.verificaUsuarioYclave(resp, correo, clave) ) );
  }

   private verificaUsuarioYclave( elementos, correo:string, clave:string ): boolean{
    let respuesta = false;
    elementos.forEach((dato:any) => {
      if(dato.clave == clave && dato.correo==correo){
        console.log(dato);
        localStorage.setItem('usuario',JSON.stringify(dato));
        respuesta= true;
      }
    });
    return respuesta;
  }
}
