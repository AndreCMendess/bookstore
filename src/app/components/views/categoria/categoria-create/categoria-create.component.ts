import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria-create',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent implements OnInit{

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service : CategoriaService , private router : Router) {}

  ngOnInit(): void {}

  create(): void{
        this.service.create(this.categoria).subscribe((resposta) => {
        this.router.navigate(["categorias"]);
        this.service.message('Categoria criada com sucesso!');
    } , err => {
      for(let i = 0; i < err.error.errors.length; i++){
        this.service.message(err.error.errors[i].message);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

} 
