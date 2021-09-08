import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    private router: Router
    ) {}


    token ={
      headers: new HttpHeaders().set('Authorization',environment.token),
    }

entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://blogpessoalwesley.herokuapp.com/usuarios/logar',
      usuarioLogin)
  }

cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://blogpessoalwesley.herokuapp.com/usuarios/cadastrar',
      usuario)
  }

getByIdUsuario(id:number) : Observable<Usuario>{
  return this.http.get<Usuario>(`https://blogpessoalwesley.herokuapp.com/usuarios/${id}`,this.token)
}

putUsuario(usuario: Usuario): Observable<Usuario>{
  return this.http.put<Usuario>("https://blogpessoalwesley.herokuapp.com/usuarios/alterar",usuario)
}

logado(){
  let ok: boolean = false

  if(environment.token != ''){
    ok = true
    }
    return ok
  }
}
