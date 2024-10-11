import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './categoria-update.component.html',
  styleUrl: './categoria-update.component.css'
})  
export class CategoriaUpdateComponent implements OnInit {

categoria : Categoria = {
  
  id:'',
  nome:'',
  descricao:''

}
constructor(private service : CategoriaService , private route : ActivatedRoute  , private router : Router) {}

ngOnInit(): void {
  
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.categoria.id = id;
    this.findById();
  } else {
  
    console.error('ID não encontrado no parâmetro da rota.');
    
  }
}

findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta: Categoria) => {
        this.categoria.nome = resposta.nome;
        this.categoria.descricao = resposta.descricao;
        console.log(this.categoria);
    });
} 

cancel(): void {
  this.router.navigate(['categorias']);
}

update(): void {
  this.service.update(this.categoria).subscribe((resposta)=> {
    this.router.navigate(['categorias'])
    this.service.message("Categoria atualziada com sucesso")
  },err => {
    this.service.message("Validar se todos os campos estao preenchidos corretamente")
  })
}


}
