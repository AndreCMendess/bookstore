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
  selector: 'app-livro-create',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './livro-create.component.html',
  styleUrl: './livro-create.component.css'
})

export class LivroCreateComponent implements OnInit {

  titulo = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
  nomeAutor = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
  texto = new FormControl("", [Validators.minLength(10), Validators.maxLength(2000000)]);

constructor(private service : LivroService , private route: ActivatedRoute , private router: Router){}

id_cat: String = "";

livro: Livro = {
  id: '' ,
  titulo: '',
  nomeAutor: '',
  texto: ''
}
  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get(`id_cat`) || "";
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

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro criado com sucesso!");
        console.log('Resposta da API:', resposta);
        console.log(this.livro);
      },
      (err) => {
        console.error('Erro ao criar livro:', err);
        this.service.message("Erro ao criar novo livro!");
        console.log(this.livro);
        console.error('Detalhes do erro:', err.error);
        console.error('Status:', err.status);
      }
    );
  }

  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
}
