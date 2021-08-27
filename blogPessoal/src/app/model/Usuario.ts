import { Postagem } from "./Postagem"

export class Usuario{
    public id: number
    public nome:string
    public senha:string
    public usuario: string
    public foto: string
    public tipo:string
    public postagem: Postagem[]
    public dataNascimento:Date
    }