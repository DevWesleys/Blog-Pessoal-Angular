import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  
  postagem: Postagem = new Postagem();
listaPostagens: Postagem[]

  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();


  usuario: Usuario = new Usuario();
  idUsuario = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
  private authService: AuthService
  ) {}

  ngOnInit() {

window.scroll(0,0)

    if (environment.token == '') {
      alert('Sua seção expirou, faça um login novamente.');
      this.router.navigate(['/entrar']);
    }
    this.findAllTemas()
    this.getAll()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

getAll(){
this.postagemService.getAll().subscribe((resp: Postagem[])=>{
this.listaPostagens = resp
  })
}
findByIdUsuario(){
  this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario)=>{
  this.usuario = resp
  })
}

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert('Postagem realizada com sucesso!')
        this.postagem = new Postagem()
        this.getAll()
      })
  }
}
