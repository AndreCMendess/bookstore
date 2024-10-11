import { Component, OnInit } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';



@Component({ 
  selector: 'app-livro-delete',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './livro-delete.component.html',
  styleUrl: './livro-delete.component.css'
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: ""
  }

 constructor(private router:Router , private service:LivroService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get("id_cat") || "";
      this.livro.id = this.route.snapshot.paramMap.get("id")!;
      this.findById();
  }

  findById():void{
    this.service.findById(this.livro.id!).subscribe((resposta:Livro) => {
    this.livro = resposta;
    });
  }

  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  delete():void{

  
    
      this.service.delete(this.livro.id).subscribe(()=>{
      this.service.message("Livro deletado com sucesso")
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
    },(err)=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message("Não foi possivel deletar ,  tente mais tarde")
      console.log(this.livro);
      console.error(err.error);
      console.error(err.status)
    })
  }

}
