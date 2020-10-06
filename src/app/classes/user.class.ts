import{IUser} from '../interfaces/IUser';
export class User implements IUser {
    id:number;
    correo: string;
    contrasena: string;
    perfil: string;
    sexo: string;
}   