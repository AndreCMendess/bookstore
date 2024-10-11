import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';



@Component({
  selector: 'app-categoria-delete',
  standalone: true,
  imports: [RouterModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule],
  templateUrl: './categoria-delete.component.html',
  styleUrl: './categoria-delete.component.css'
})

export class CategoriaDeleteComponent implements OnInit {

  constructor( private router : Router , private service : CategoriaService , private route : ActivatedRoute) {}

  categoria: Categoria = {
    id: "" ,
    nome :"",
    descricao:""
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.categoria.id = id as string;
      this.findById();
    } else {
      console.error("ID não encontrado na rota.");
      this.cancel();
  }
      
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

  findById(): void {
    const id = this.categoria.id ?? '';
    if (id) {
        this.service.findById(id).subscribe((resposta: Categoria) => {
            this.categoria.nome = resposta.nome;
            this.categoria.descricao = resposta.descricao;
            console.log(this.categoria);
        });
    } else {
        console.error("ID inválido.");
        this.cancel();
    }
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.message("Categoria deletada com sucesso")
    }, err => {
      this.service.message("Categoria com livros vinculados, não é possivel deletar");
    })
  }
 
 

}
