import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms'; 
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-update',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,CommonModule,ReactiveFormsModule],
  templateUrl: './livro-update.component.html',
  styleUrl: './livro-update.component.css'
})
export class LivroUpdateComponent implements OnInit{

  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: ""
  }

 constructor(private router:Router , private service:LivroService, private route:ActivatedRoute , ){}

 
 titulo = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
 nomeAutor = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
 texto = new FormControl("", [Validators.minLength(10), Validators.maxLength(2000000)]);
  


  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get("id_cat") || "";
      this.livro.id = this.route.snapshot.paramMap.get("id")!;
      this.findById();
  }

  getMessage(){

    if(this.titulo.invalid){
      return " O titulo deve conter entre 3 e 100 caracteres";
    }
    if(this.nomeAutor.invalid){
      return " O nome do autor deve conter entre 3 e 100 caracteres"
    }
    if(this.texto.invalid){
      return " o texto do livro deve conter entre 10 e 2000000 caracteres"
    }
    return null;
  }

  findById():void{
    this.service.findById(this.livro.id!).subscribe((resposta:Livro) => {
    this.livro = resposta;
    });
  }

  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  update(): void{
      this.service.update(this.livro).subscribe((resposta) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message("Livro atualizado com sucesso");
      console.log(resposta);
    }, (err) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message(" Não foi possivel atualizar! Tente mais tarde...");
      console.log(this.livro);
      console.log(err.error);
      console.log(err.status);
      console.error();
    }); 
  }
}
